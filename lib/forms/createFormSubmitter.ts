import { runSubmitPipeline } from "@/lib/forms/submitPipeline";
import type { PipelineResult, StandardFormPayload, ValidationResult } from "@/lib/forms/types";

export function createFormSubmitter<T extends Record<string, unknown>>(config: {
  validate: (raw: T & { _honeypot?: string }) => ValidationResult<Record<string, string>>;
  transform: (
    data: Record<string, string>,
    ctx: { sourcePage?: string },
  ) => StandardFormPayload;
  defaultSourcePage: string;
}) {
  return async (
    raw: T & { _honeypot?: string },
    options?: { sourcePage?: string; signal?: AbortSignal },
  ): Promise<PipelineResult> => {
    return runSubmitPipeline({
      raw,
      validate: config.validate,
      transform: config.transform,
      sourcePage: options?.sourcePage ?? config.defaultSourcePage,
      signal: options?.signal,
    });
  };
}
