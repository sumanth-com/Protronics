import { postToGoogleSheets } from "@/lib/forms/googleSheetsClient";
import { sanitizePayload } from "@/lib/forms/sanitize";
import type { PipelineResult, StandardFormPayload, ValidationResult } from "@/lib/forms/types";

const inFlight = new Map<string, Promise<PipelineResult>>();

export type SubmitPipelineInput<T extends Record<string, unknown>> = {
  raw: T & { _honeypot?: string };
  validate: (raw: T & { _honeypot?: string }) => ValidationResult<Record<string, string>>;
  transform: (
    data: Record<string, string>,
    ctx: { sourcePage?: string },
  ) => StandardFormPayload;
  sourcePage?: string;
  dedupeKey?: string;
  signal?: AbortSignal;
};

function buildMetadata(): StandardFormPayload["metadata"] {
  if (typeof window === "undefined") {
    return { page_url: "", path: "", referrer: "" };
  }
  return {
    page_url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || "",
  };
}

function attachMetadata(payload: StandardFormPayload): StandardFormPayload {
  return {
    ...payload,
    metadata: { ...buildMetadata(), ...payload.metadata },
  };
}

export async function runSubmitPipeline<T extends Record<string, unknown>>(
  input: SubmitPipelineInput<T>,
): Promise<PipelineResult> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return {
      success: false,
      error: "You appear to be offline. Reconnect and try again.",
      code: "OFFLINE",
    };
  }

  const honeypot = String(input.raw._honeypot ?? "").trim();
  // Client honeypot: pretend success so bots do not learn the trap.
  // Server `/api/forms` also rejects filled honeypots if present in the body.
  if (honeypot) {
    return { success: true, message: "Submitted Successfully" };
  }

  const rest = { ...input.raw };
  delete rest._honeypot;
  const validation = input.validate(rest as T & { _honeypot?: string });
  if (!validation.success) {
    return {
      success: false,
      error: "Please fix the highlighted fields.",
      code: "VALIDATION",
      errors: validation.errors,
    };
  }

  let payload = input.transform(validation.data, { sourcePage: input.sourcePage });
  payload = attachMetadata(payload);
  payload = sanitizePayload(payload);

  const dedupeKey =
    input.dedupeKey ?? `${payload.form_type}:${JSON.stringify(payload.data)}`;
  const existing = inFlight.get(dedupeKey);
  if (existing) {
    return { ...await existing, code: "DUPLICATE" };
  }

  const task = (async (): Promise<PipelineResult> => {
    const res = await postToGoogleSheets(
      { ...payload, _honeypot: "" },
      input.signal,
    );
    if (!res.success) {
      return {
        success: false,
        error: res.error,
        code: res.code ?? "SERVER",
      };
    }
    return {
      success: true,
      message: res.message,
      data: {
        form_type: payload.form_type,
        sheet_tab: payload.sheet_tab,
        timestamp: payload.submitted_at,
      },
    };
  })();

  inFlight.set(dedupeKey, task);
  try {
    return await task;
  } finally {
    inFlight.delete(dedupeKey);
  }
}
