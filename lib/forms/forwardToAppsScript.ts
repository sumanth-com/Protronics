import type { StandardFormPayload } from "@/lib/forms/types";

const SCRIPT_URL_RE =
  /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/;

const REQUEST_TIMEOUT_MS = 18_000;

/** Server-only Apps Script webhook URL (never expose to the client). */
export function getServerFormEndpoint(): string | null {
  const url = (
    process.env.FORM_ENDPOINT_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL ||
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    ""
  ).trim();
  if (!url) return null;
  if (!SCRIPT_URL_RE.test(url)) return null;
  return url;
}

export function isFormEndpointConfigured(): boolean {
  return Boolean(getServerFormEndpoint());
}

export type ForwardResult =
  | { success: true; message: string; data?: Record<string, unknown> }
  | { success: false; error: string; code?: "ENDPOINT" | "NETWORK" | "HTTP" | "PARSE" | "SERVER" };

function parseResponseBody(text: string): ForwardResult {
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
    return {
      success: false,
      error: "Unexpected response from form service.",
      code: "PARSE",
    };
  }
}

/**
 * Forward a validated payload to Google Apps Script from the server.
 * Optionally attaches FORM_WEBHOOK_SECRET for Apps Script verification.
 */
export async function forwardToAppsScript(
  payload: StandardFormPayload,
  options?: { idempotencyKey?: string },
): Promise<ForwardResult> {
  const endpoint = getServerFormEndpoint();
  if (!endpoint) {
    return {
      success: false,
      error: "Form endpoint not configured on the server.",
      code: "ENDPOINT",
    };
  }

  const secret = process.env.FORM_WEBHOOK_SECRET?.trim() || "";
  const outbound = {
    ...payload,
    ...(secret ? { webhook_secret: secret } : {}),
    ...(options?.idempotencyKey
      ? { idempotency_key: options.idempotencyKey.slice(0, 80) }
      : {}),
  };

  const body = new URLSearchParams({
    payload: JSON.stringify(outbound),
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });

    const text = await res.text();
    const parsed = parseResponseBody(text);

    if (!res.ok && !parsed.success) {
      return { ...parsed, code: parsed.code ?? "HTTP" };
    }
    return parsed;
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      error: isAbort
        ? "Request timed out. Please try again."
        : "Network error reaching form service.",
      code: "NETWORK",
    };
  } finally {
    clearTimeout(timeout);
  }
}
