import type { ValidationResult } from "@/lib/forms/types";
import { isValidEmail, required } from "@/lib/forms/validation/shared";

export type NewsletterValues = { email: string };

export function validateNewsletter(
  raw: NewsletterValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const email = String(raw.email ?? "");
  const err = required(email, "Email is required.");
  if (err) return { success: false, errors: { email: err } };
  if (!isValidEmail(email)) {
    return { success: false, errors: { email: "Enter a valid email address." } };
  }
  return { success: true, data: { email: email.trim() } };
}
