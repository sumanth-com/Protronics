import type { ValidationResult } from "@/lib/forms/types";
import { isValidPhone, required } from "@/lib/forms/validation/shared";

export type TradeInFormValues = {
  name: string;
  phone: string;
  city: string;
  applianceType: string;
  brand: string;
  model: string;
  age: string;
  condition: string;
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

  const phone = String(raw.phone ?? "");
  if (!errors.phone && !isValidPhone(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name: String(raw.name).trim(),
      phone: phone.trim(),
      city: String(raw.city).trim(),
      applianceType: String(raw.applianceType),
      brand: String(raw.brand),
      model: String(raw.model).trim(),
      age: String(raw.age),
      condition: String(raw.condition),
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
