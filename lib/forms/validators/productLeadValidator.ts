import type { ValidationResult } from "@/lib/forms/types";
import {
  isValidPhone,
  normalizePhone,
  PHONE_VALIDATION_MESSAGE,
  required,
} from "@/lib/forms/validation/shared";

export type ProductLeadValues = {
  leadType: string;
  productName: string;
  productId: string;
  price: string;
  name: string;
  phone: string;
  city?: string;
  contactPreference?: string;
  message?: string;
  preferredTime?: string;
  leadSource: string;
  referenceId?: string;
};

export function validateProductLead(
  raw: ProductLeadValues & { _honeypot?: string },
): ValidationResult<Record<string, string>> {
  const errors: Record<string, string> = {};
  const name = String(raw.name ?? "");
  const phone = normalizePhone(String(raw.phone ?? ""));
  const productId = String(raw.productId ?? "");
  const productName = String(raw.productName ?? "");
  const leadType = String(raw.leadType ?? "");

  if (required(name)) errors.name = "Name is required.";
  if (required(phone, "Phone is required.")) errors.phone = "Phone is required.";
  else if (!isValidPhone(phone)) errors.phone = PHONE_VALIDATION_MESSAGE;
  if (required(productId)) errors.productId = "Product is required.";
  if (required(productName)) errors.productName = "Product name is required.";
  if (leadType === "reserve" && required(String(raw.city ?? ""), "City is required.")) {
    errors.city = "City is required for reservations.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      leadType,
      productName: productName.trim(),
      productId,
      price: String(raw.price ?? "0"),
      name: name.trim(),
      phone,
      city: String(raw.city ?? "").trim(),
      contactPreference: String(raw.contactPreference ?? ""),
      message: String(raw.message ?? "").trim(),
      preferredTime: String(raw.preferredTime ?? ""),
      leadSource: String(raw.leadSource ?? ""),
      referenceId: String(raw.referenceId ?? ""),
    },
  };
}
