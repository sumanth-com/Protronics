import type { ValidationResult } from "@/lib/forms/types";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
  PHONE_VALIDATION_MESSAGE,
  required,
} from "@/lib/forms/validation/shared";

export type ServiceRequestValues = {
  name: string;
  phone: string;
  email: string;
  issue: string;
  preferredTime: string;
};

export function validateServiceRequest(
  raw: ServiceRequestValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};
  const name = String(raw.name ?? "");
  const phone = normalizePhone(String(raw.phone ?? ""));
  const email = String(raw.email ?? "");
  const issue = String(raw.issue ?? "");
  const preferredTime = String(raw.preferredTime ?? "");

  const e1 = required(name, "Please enter your name.");
  if (e1) errors.name = e1;
  const e2 = required(phone, "Phone number is required.");
  if (e2) errors.phone = e2;
  else if (!isValidPhone(phone)) errors.phone = PHONE_VALIDATION_MESSAGE;
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address.";
  const e3 = required(issue, "Describe the issue or request.");
  if (e3) errors.issue = e3;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: name.trim(),
      phone,
      email: email.trim(),
      issue: issue.trim(),
      preferredTime: preferredTime.trim(),
    },
  };
}
