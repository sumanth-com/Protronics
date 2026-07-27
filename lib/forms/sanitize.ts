import type { StandardFormPayload } from "@/lib/forms/types";

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const HTML_TAG = /<\/?[a-z][^>]*>/gi;
const EVENT_HANDLER = /\bon\w+\s*=/gi;
const JS_PROTOCOL = /javascript\s*:/gi;

/** Neutralize spreadsheet formula injection (=, +, -, @, tab, CR). */
export function neutralizeFormulaInjection(value: string): string {
  if (!value) return value;
  const first = value.charAt(0);
  if (first === "=" || first === "+" || first === "-" || first === "@" || first === "\t" || first === "\r") {
    return `'${value}`;
  }
  return value;
}

export function sanitizeString(value: unknown, maxLength = 5000): string {
  if (value === null || value === undefined) return "";
  let str = String(value).replace(CONTROL_CHARS, "").trim();
  str = str.replace(HTML_TAG, "");
  str = str.replace(EVENT_HANDLER, "");
  str = str.replace(JS_PROTOCOL, "");
  str = neutralizeFormulaInjection(str);
  return str.length > maxLength ? str.slice(0, maxLength) : str;
}

export function sanitizeDataObject(
  data: Record<string, string | number | boolean>,
  maxLength = 5000,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("_")) continue;
    if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = value;
    } else if (typeof value === "boolean") {
      out[key] = value;
    } else {
      out[key] = sanitizeString(value, maxLength);
    }
  }
  return out;
}

export function sanitizePayload(payload: StandardFormPayload): StandardFormPayload {
  return {
    ...payload,
    form_type: payload.form_type,
    sheet_tab: sanitizeString(payload.sheet_tab, 99),
    source_page: sanitizeString(payload.source_page, 500),
    submitted_at: sanitizeString(payload.submitted_at, 40),
    data: sanitizeDataObject(payload.data),
    metadata: {
      page_url: sanitizeString(payload.metadata.page_url, 2000),
      path: sanitizeString(payload.metadata.path, 500),
      referrer: sanitizeString(payload.metadata.referrer, 2000),
    },
  };
}
