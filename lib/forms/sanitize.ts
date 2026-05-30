import type { StandardFormPayload } from "@/lib/forms/types";

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const SCRIPT_PATTERN = /<\s*script\b/gi;

export function sanitizeString(value: unknown, maxLength = 5000): string {
  if (value === null || value === undefined) return "";
  let str = String(value).replace(CONTROL_CHARS, "").trim();
  if (SCRIPT_PATTERN.test(str)) {
    str = str.replace(SCRIPT_PATTERN, "");
  }
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
