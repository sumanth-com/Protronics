import type { ValidationResult } from "@/lib/forms/types";
import { isValidEmail, isValidPhone, required } from "@/lib/forms/validation/shared";

export type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  product: string;
  message: string;
};

export function validateContact(
  raw: ContactFormValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};
  const fullName = String(raw.fullName ?? "");
  const phone = String(raw.phone ?? "");
  const email = String(raw.email ?? "");
  const city = String(raw.city ?? "");
  const product = String(raw.product ?? "");
  const message = String(raw.message ?? "");

  const e1 = required(fullName, "Please enter your name.");
  if (e1) errors.fullName = e1;
  const e2 = required(phone, "Phone number is required.");
  if (e2) errors.phone = e2;
  else if (!isValidPhone(phone)) errors.phone = "Enter a valid phone number.";
  const e3 = required(email, "Email is required.");
  if (e3) errors.email = e3;
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  const e4 = required(city, "Tell us your city for delivery.");
  if (e4) errors.city = e4;
  if (!product) errors.product = "Select a product type.";
  const e5 = required(message, "Share a few details so we can help.");
  if (e5) errors.message = e5;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      product,
      message: message.trim(),
    },
  };
}
