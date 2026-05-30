import type { FormType } from "@/lib/forms/constants/formTypes";

export type FormMetadata = {
  page_url: string;
  path: string;
  referrer: string;
};

/** Standard payload contract — every submission uses this shape. */
export type StandardFormPayload = {
  form_type: FormType;
  sheet_tab: string;
  source_page: string;
  submitted_at: string;
  data: Record<string, string | number | boolean>;
  metadata: FormMetadata;
  /** Honeypot — stripped before POST; must be empty */
  _honeypot?: string;
};

export type ValidationResult<T extends Record<string, unknown> = Record<string, string>> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

export type PipelineResult = {
  success: boolean;
  message?: string;
  error?: string;
  code?: "VALIDATION" | "HONEYPOT" | "OFFLINE" | "ENDPOINT" | "NETWORK" | "HTTP" | "PARSE" | "SERVER" | "DUPLICATE";
  errors?: Record<string, string>;
  data?: {
    form_type: FormType;
    sheet_tab: string;
    timestamp?: string;
  };
};

export type FormRegistryEntry = {
  id: FormType;
  label: string;
  formType: FormType;
  sheetTab: string;
  sourcePage: string;
  submitter: string;
};
