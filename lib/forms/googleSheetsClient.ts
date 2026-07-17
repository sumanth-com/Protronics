import type { StandardFormPayload } from "@/lib/forms/types";

const ENDPOINT_JSON_PATH = "/forms-endpoint.json";
const SCRIPT_URL_RE = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;
const REQUEST_TIMEOUT_MS = 18_000;

export type FormEndpointHealth = {
  ready: boolean;
  url: string | null;
  source: "env" | "json" | "none";
  error?: string;
};

declare global {
  interface Window {
    __FORM_HEALTH__?: FormEndpointHealth;
  }
}

let cachedUrl: string | null = null;
let resolvePromise: Promise<string> | null = null;

function readEnvEndpoint(): string | null {
  const url =
    process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ??
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
    "";
  const trimmed = url.trim();
  return trimmed || null;
}

export function isValidFormEndpointUrl(url: string): boolean {
  return SCRIPT_URL_RE.test(url.trim());
}

export function setFormHealth(health: FormEndpointHealth) {
  if (typeof window !== "undefined") {
    window.__FORM_HEALTH__ = health;
  }
}

/** Resolve Apps Script /exec URL: build env first, then /forms-endpoint.json. */
export async function resolveFormEndpointUrl(): Promise<string> {
  if (cachedUrl) return cachedUrl;
  if (resolvePromise) return resolvePromise;

  resolvePromise = (async () => {
    const fromEnv = readEnvEndpoint();
    if (fromEnv) {
      if (!isValidFormEndpointUrl(fromEnv)) {
        const health: FormEndpointHealth = {
          ready: false,
          url: null,
          source: "env",
          error: "Invalid form endpoint URL format (NEXT_PUBLIC_FORM_ENDPOINT).",
        };
        setFormHealth(health);
        throw new Error(health.error);
      }
      cachedUrl = fromEnv;
      setFormHealth({ ready: true, url: fromEnv, source: "env" });
      return fromEnv;
    }

    if (typeof window === "undefined") {
      throw new Error("Form endpoint not configured.");
    }

    const res = await fetch(ENDPOINT_JSON_PATH, { cache: "no-store" });
    if (!res.ok) {
      const health: FormEndpointHealth = {
        ready: false,
        url: null,
        source: "none",
        error: `Could not load ${ENDPOINT_JSON_PATH}.`,
      };
      setFormHealth(health);
      throw new Error(health.error);
    }

    const json = (await res.json()) as { url?: string | null };
    const url = String(json.url ?? "").trim();
    if (!url || !isValidFormEndpointUrl(url)) {
      const health: FormEndpointHealth = {
        ready: false,
        url: null,
        source: "json",
        error:
          "Form endpoint not configured. Set NEXT_PUBLIC_FORM_ENDPOINT in .env (local) or Vercel env vars, then rebuild.",
      };
      setFormHealth(health);
      throw new Error(health.error);
    }

    cachedUrl = url;
    setFormHealth({ ready: true, url, source: "json" });
    return url;
  })();

  return resolvePromise;
}

export type SheetsClientResult =
  | { success: true; message: string; data?: Record<string, unknown> }
  | { success: false; error: string; code?: "ENDPOINT" | "NETWORK" | "HTTP" | "PARSE" | "SERVER" };

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
      mode: "cors",
      credentials: "omit",
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
      code: "SERVER",
    };
  } catch {
    if (trimmed.toLowerCase().includes("success")) {
      return { success: true, message: "Submitted Successfully" };
    }
    return { success: false, error: "Unexpected response from form service.", code: "PARSE" };
  }
}

/**
 * POST to Google Apps Script using urlencoded `payload` (browser CORS-friendly).
 */
export async function postToGoogleSheets(
  payload: StandardFormPayload,
  signal?: AbortSignal,
): Promise<SheetsClientResult> {
  let endpoint: string;
  try {
    endpoint = await resolveFormEndpointUrl();
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Form endpoint not configured.",
      code: "ENDPOINT",
    };
  }

  const body = new URLSearchParams({
    payload: JSON.stringify(payload),
  });

  const attempt = async (): Promise<SheetsClientResult> => {
    try {
      const res = await fetchWithTimeout(
        endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        },
        signal,
      );

      const text = await res.text();
      const parsed = parseResponseBody(text);

      if (!res.ok && parsed.success) {
        return parsed;
      }
      if (!parsed.success) {
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
  };

  const first = await attempt();
  if (first.success || first.code === "SERVER" || first.code === "PARSE") {
    return first;
  }
  if (first.code === "NETWORK") {
    await new Promise((r) => setTimeout(r, 800));
    return attempt();
  }
  return first;
}

/** Call on app startup (client) to warm endpoint resolution. */
export async function initFormEndpointHealth(): Promise<FormEndpointHealth> {
  try {
    await resolveFormEndpointUrl();
    return window.__FORM_HEALTH__ ?? { ready: true, url: cachedUrl, source: "env" };
  } catch {
    return (
      window.__FORM_HEALTH__ ?? {
        ready: false,
        url: null,
        source: "none",
        error: "Endpoint not ready",
      }
    );
  }
}
