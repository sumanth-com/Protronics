"use client";

/**
 * Production form hook — validation state, honeypot, abort, offline handling.
 * Alias of useFormSubmission for the canonical API name.
 */
export {
  useFormSubmission as useFormSubmit,
  type FormSubmitterFn,
  type UseFormSubmissionOptions as UseFormSubmitOptions,
} from "@/hooks/useFormSubmission";
