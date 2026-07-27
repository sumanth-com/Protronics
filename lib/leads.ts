import { submitProductLeadForm } from "@/lib/forms/submitters/productLeadSubmitter";
import { SHOP_PRODUCTS } from "@/lib/shop";

export type LeadType = "reserve" | "callback";

export type ContactPreference = "WhatsApp" | "Call";

export type LeadPayload = {
  leadType: LeadType;
  productName: string;
  productId: string;
  price: number;
  name: string;
  phone: string;
  city?: string;
  contactPreference?: ContactPreference;
  message?: string;
  preferredTime?: string;
  pageUrl: string;
  _honeypot?: string;
};

export type LeadResponse = {
  ok: boolean;
  referenceId: string;
  error?: string;
  message?: string;
};

export function generateReferenceId(product: {
  brand: string;
  capacity: string;
}): string {
  const code = `${product.brand}${product.capacity.replace(/\D/g, "")}`.toUpperCase();
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  return `PR-${code}-${year}-${seq}`;
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const product = SHOP_PRODUCTS.find((p) => p.id === payload.productId);
  const referenceId = generateReferenceId({
    brand: product?.brand ?? payload.productName.split(" ")[0] ?? "PR",
    capacity: product?.capacity ?? "",
  });

  const result = await submitProductLeadForm(
    {
      leadType: payload.leadType,
      productName: payload.productName,
      productId: payload.productId,
      price: String(payload.price),
      name: payload.name,
      phone: payload.phone,
      city: payload.city ?? "",
      contactPreference: payload.contactPreference ?? "",
      message: payload.message ?? "",
      preferredTime: payload.preferredTime ?? "",
      referenceId,
      _honeypot: payload._honeypot,
    },
    { sourcePage: payload.pageUrl },
  );

  if (!result.success) {
    throw new Error(result.error ?? "Failed to submit. Please try again.");
  }

  return {
    ok: true,
    referenceId,
    message: result.message,
  };
}
