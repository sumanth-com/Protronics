import { FORM_TYPES, type FormType } from "@/lib/forms/constants/formTypes";
import { getSheetTab } from "@/lib/forms/constants/sheetTabs";
import { sanitizePayload, sanitizeString } from "@/lib/forms/sanitize";
import type { StandardFormPayload } from "@/lib/forms/types";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
} from "@/lib/forms/validation/shared";

const ALLOWED_TYPES = new Set<string>(Object.values(FORM_TYPES));

const REQUIRED_KEYS: Record<FormType, string[]> = {
  contact: ["fullName", "phone", "email", "city"],
  "product-lead": ["name", "phone", "productName", "leadType"],
  "trade-in": [
    "name",
    "phone",
    "city",
    "applianceType",
    "brand",
    "model",
    "age",
    "condition",
  ],
};

export type ServerValidateResult =
  | { ok: true; payload: StandardFormPayload }
  | { ok: false; error: string; status: number };

function isFormType(value: string): value is FormType {
  return ALLOWED_TYPES.has(value);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

/**
 * Re-validate a client-built StandardFormPayload on the server.
 * Rejects honeypots, unknown types, missing required fields, and bad phones/emails.
 */
export function validateStandardPayload(raw: unknown): ServerValidateResult {
  const body = asRecord(raw);
  if (!body) {
    return { ok: false, error: "Invalid payload.", status: 400 };
  }

  const honeypot = sanitizeString(body._honeypot ?? "", 200);
  if (honeypot) {
    // Silent success path is handled by the route; treat as reject for validation.
    return { ok: false, error: "HONEYPOT", status: 200 };
  }

  const formTypeRaw = sanitizeString(body.form_type ?? "", 64);
  if (!formTypeRaw || !isFormType(formTypeRaw)) {
    return { ok: false, error: "Unknown or missing form_type.", status: 400 };
  }

  const dataRaw = asRecord(body.data);
  if (!dataRaw) {
    return { ok: false, error: "Missing data object.", status: 400 };
  }

  const data: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(dataRaw)) {
    if (key.startsWith("_")) continue;
    if (typeof value === "number" && Number.isFinite(value)) {
      data[key] = value;
    } else if (typeof value === "boolean") {
      data[key] = value;
    } else {
      data[key] = sanitizeString(value, 5000);
    }
  }

  for (const key of REQUIRED_KEYS[formTypeRaw]) {
    const val = data[key];
    if (val === undefined || val === null || String(val).trim() === "") {
      return {
        ok: false,
        error: `Missing required field: ${key}.`,
        status: 400,
      };
    }
  }

  const phone = normalizePhone(String(data.phone ?? ""));
  if (!isValidPhone(phone)) {
    return { ok: false, error: "Invalid phone number.", status: 400 };
  }
  data.phone = phone;

  if (formTypeRaw === "contact") {
    const email = String(data.email ?? "").trim();
    if (!isValidEmail(email)) {
      return { ok: false, error: "Invalid email address.", status: 400 };
    }
    data.email = email;
  }

  if (formTypeRaw === "product-lead" && data.leadType === "reserve") {
    if (!String(data.city ?? "").trim()) {
      return { ok: false, error: "City is required for reservations.", status: 400 };
    }
  }

  const metadataRaw = asRecord(body.metadata) ?? {};
  const payload: StandardFormPayload = sanitizePayload({
    form_type: formTypeRaw,
    sheet_tab: getSheetTab(formTypeRaw),
    source_page: sanitizeString(body.source_page ?? "", 500) || "/",
    submitted_at:
      sanitizeString(body.submitted_at ?? "", 40) || new Date().toISOString(),
    data,
    metadata: {
      page_url: sanitizeString(metadataRaw.page_url ?? "", 2000),
      path: sanitizeString(metadataRaw.path ?? "", 500),
      referrer: sanitizeString(metadataRaw.referrer ?? "", 2000),
    },
  });

  return { ok: true, payload };
}
