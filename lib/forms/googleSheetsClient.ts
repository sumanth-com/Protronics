import type { StandardFormPayload } from "@/lib/forms/types";

export type FormEndpointHealth = {
  ready: boolean;
  source: "api" | "none";
  error?: string;
};

declare global {
  interface Window {
    __FORM_HEALTH__?: FormEndpointHealth;
  }
}

let healthCache: FormEndpointHealth | null = null;
let healthPromise: Promise<FormEndpointHealth> | null = null;

export function setFormHealth(health: FormEndpointHealth) {
  healthCache = health;
  if (typeof window !== "undefined") {
    window.__FORM_HEALTH__ = health;
  }
}

export type SheetsClientResult =
  | { success: true; message: string; data?: Record<string, unknown> }
  | {
      success: false;
      error: string;
      code?: "ENDPOINT" | "NETWORK" | "HTTP" | "PARSE" | "SERVER" | "RATE_LIMIT";
    };

const REQUEST_TIMEOUT_MS = 20_000;

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  signal?: AbortSignal,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      credentials: "same-origin",
    });
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", onAbort);
  }
}

function parseResponseBody(text: string): SheetsClientResult {
  const trimmed = text.trim();
  try {
    const json = JSON.parse(trimmed) as {
      success?: boolean;
      message?: string;
      error?: string;
      code?: string;
      data?: Record<string, unknown>;
    };
    if (json.success === true) {
      return {
        success: true,
        message: json.message ?? "Submitted Successfully",
        data: json.data,
      };
    }
    return {
      success: false,
      error: json.error ?? json.message ?? "Submission failed.",
      code:
        json.code === "RATE_LIMIT"
          ? "RATE_LIMIT"
          : json.code === "ENDPOINT"
            ? "ENDPOINT"
            : "SERVER",
    };
  } catch {
    return {
      success: false,
      error: "Unexpected response from form service.",
      code: "PARSE",
    };
  }
}

/**
 * POST validated payload to the same-origin `/api/forms` proxy.
 * The Apps Script webhook URL stays server-side only.
 */
export async function postToGoogleSheets(
  payload: StandardFormPayload & { _honeypot?: string },
  signal?: AbortSignal,
): Promise<SheetsClientResult> {
  const idempotencyKey =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    const res = await fetchWithTimeout(
      "/api/forms",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          idempotency_key: idempotencyKey,
        }),
      },
      signal,
    );

    const text = await res.text();
    const parsed = parseResponseBody(text);

    if (res.status === 429) {
      return {
        success: false,
        error: parsed.success ? "Too many submissions." : parsed.error,
        code: "RATE_LIMIT",
      };
    }

    if (!res.ok && !parsed.success) {
      return { ...parsed, code: parsed.code ?? "HTTP" };
    }
    return parsed;
  } catch (err) {
    if (signal?.aborted) {
      return { success: false, error: "Submission cancelled.", code: "NETWORK" };
    }
    const isAbort = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      error: isAbort
        ? "Request timed out. Please try again."
        : "Network error. Check your connection and try again.",
      code: "NETWORK",
    };
  }
}

/** Warm `/api/forms` health without exposing webhook URLs. */
export async function initFormEndpointHealth(): Promise<FormEndpointHealth> {
  if (healthCache?.ready) return healthCache;
  if (healthPromise) return healthPromise;

  healthPromise = (async () => {
    try {
      const res = await fetch("/api/forms", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!res.ok) {
        const health: FormEndpointHealth = {
          ready: false,
          source: "none",
          error: "Form API unavailable.",
        };
        setFormHealth(health);
        return health;
      }
      const json = (await res.json()) as { ready?: boolean };
      const health: FormEndpointHealth = {
        ready: Boolean(json.ready),
        source: "api",
        error: json.ready ? undefined : "Form endpoint not configured on the server.",
      };
      setFormHealth(health);
      return health;
    } catch {
      const health: FormEndpointHealth = {
        ready: false,
        source: "none",
        error: "Form API unavailable.",
      };
      setFormHealth(health);
      return health;
    } finally {
      healthPromise = null;
    }
  })();

  return healthPromise;
}

/** @deprecated Client no longer resolves Apps Script URLs. */
export function isValidFormEndpointUrl(url: string): boolean {
  return /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(
    url.trim(),
  );
}
