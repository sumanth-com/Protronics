import type { ValidationResult } from "@/lib/forms/types";
import {
  isValidPhone,
  normalizePhone,
  PHONE_VALIDATION_MESSAGE,
  required,
} from "@/lib/forms/validation/shared";

export type TradeInFormValues = {
  name: string;
  phone: string;
  email?: string;
  city: string;
  applianceType: string;
  brand: string;
  model: string;
  age: string;
  condition: string;
  workingStatus?: string;
  description?: string;
  expectedPrice?: string;
  estimatedLow?: string;
  estimatedHigh?: string;
  imageCount: string;
  imageNames: string;
  leadSource: string;
  referenceId?: string;
};

export function validateTradeIn(
  raw: TradeInFormValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};
  const checks: [keyof TradeInFormValues, string][] = [
    ["name", "Please enter your name."],
    ["phone", "Phone is required."],
    ["city", "City is required."],
    ["applianceType", "Appliance type is required."],
    ["brand", "Brand is required."],
    ["model", "Model is required."],
    ["age", "Age is required."],
    ["condition", "Condition is required."],
  ];

  for (const [key, msg] of checks) {
    const err = required(String(raw[key] ?? ""), msg);
    if (err) errors[key] = err;
  }

  const phone = normalizePhone(String(raw.phone ?? ""));
  if (!errors.phone && !isValidPhone(phone)) {
    errors.phone = PHONE_VALIDATION_MESSAGE;
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name: String(raw.name).trim(),
      phone,
      city: String(raw.city).trim(),
      applianceType: String(raw.applianceType),
      brand: String(raw.brand),
      model: String(raw.model).trim(),
      age: String(raw.age),
      condition: String(raw.condition),
      email: String(raw.email ?? "").trim(),
      workingStatus: String(raw.workingStatus ?? ""),
      description: String(raw.description ?? "").trim(),
      expectedPrice: String(raw.expectedPrice ?? ""),
      estimatedLow: String(raw.estimatedLow ?? ""),
      estimatedHigh: String(raw.estimatedHigh ?? ""),
      imageCount: String(raw.imageCount ?? "0"),
      imageNames: String(raw.imageNames ?? ""),
      leadSource: String(raw.leadSource ?? ""),
      referenceId: String(raw.referenceId ?? ""),
    },
  };
}
