"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PipelineResult } from "@/lib/forms/types";

export type FormSubmitterFn<T> = (
  values: T & { _honeypot?: string },
  options?: { sourcePage?: string; signal?: AbortSignal },
) => Promise<PipelineResult>;

export type UseFormSubmissionOptions<T extends Record<string, unknown>> = {
  initialValues: T;
  submitter: FormSubmitterFn<T>;
  sourcePage?: string;
  onSuccess?: (result: PipelineResult) => void;
};

export function useFormSubmission<T extends Record<string, unknown>>(
  options: UseFormSubmissionOptions<T>,
) {
  const { initialValues, submitter, sourcePage, onSuccess } = options;
  const [values, setValues] = useState<T>(initialValues);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setFieldErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
    setSubmitError("");
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setValues(initialValues);
    setHoneypot("");
    setFieldErrors({});
    setSubmitError("");
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (isSubmitting) return null;

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setSubmitError("You appear to be offline. Reconnect and try again.");
        return null;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSubmitting(true);
      setSubmitError("");
      setFieldErrors({});

      const result = await submitter(
        { ...values, _honeypot: honeypot },
        { sourcePage, signal: controller.signal },
      );

      if (controller.signal.aborted) {
        setIsSubmitting(false);
        return null;
      }

      setIsSubmitting(false);

      if (!result.success) {
        if (result.errors) setFieldErrors(result.errors);
        setSubmitError(result.error ?? "Submission failed. Please try again.");
        return result;
      }

      setIsSuccess(true);
      setValues(initialValues);
      setHoneypot("");
      onSuccess?.(result);
      return result;
    },
    [honeypot, initialValues, isSubmitting, sourcePage, submitter, values, onSuccess],
  );

  return {
    values,
    setValues,
    setValue,
    honeypot,
    setHoneypot,
    fieldErrors,
    submitError,
    isSubmitting,
    isSuccess,
    handleSubmit,
    reset,
  };
}
