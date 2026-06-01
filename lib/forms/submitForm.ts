import { postToGoogleSheets } from "@/lib/forms/googleSheetsClient";
import { runSubmitPipeline } from "@/lib/forms/submitPipeline";
import type { PipelineResult, StandardFormPayload, ValidationResult } from "@/lib/forms/types";

export type SubmitFormOptions<T extends Record<string, unknown>> = {
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

/** Validate → transform → sanitize → POST to Google Sheets (Apps Script). */
export async function submitForm<T extends Record<string, unknown>>(
  options: SubmitFormOptions<T>,
): Promise<PipelineResult> {
  return runSubmitPipeline(options);
}

export { postToGoogleSheets, runSubmitPipeline };
