import type { ValidationResult } from "@/lib/forms/types";
import { isValidEmail, isValidPhone, required } from "@/lib/forms/validation/shared";

export type WarrantyRegistrationValues = {
  name: string;
  phone: string;
  email: string;
  serialNumber: string;
  purchaseDate: string;
  model: string;
};

export function validateWarrantyRegistration(
  raw: WarrantyRegistrationValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};
  const name = String(raw.name ?? "");
  const phone = String(raw.phone ?? "");
  const email = String(raw.email ?? "");
  const serialNumber = String(raw.serialNumber ?? "");
  const purchaseDate = String(raw.purchaseDate ?? "");
  const model = String(raw.model ?? "");

  const e1 = required(name, "Please enter your name.");
  if (e1) errors.name = e1;
  const e2 = required(phone, "Phone number is required.");
  if (e2) errors.phone = e2;
  else if (!isValidPhone(phone)) errors.phone = "Enter a valid phone number.";
  const e3 = required(email, "Email is required.");
  if (e3) errors.email = e3;
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  const e4 = required(serialNumber, "Serial number is required.");
  if (e4) errors.serialNumber = e4;
  const e5 = required(model, "Model name is required.");
  if (e5) errors.model = e5;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      serialNumber: serialNumber.trim(),
      purchaseDate: purchaseDate.trim(),
      model: model.trim(),
    },
  };
}
