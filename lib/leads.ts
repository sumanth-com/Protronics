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
  leadSource: string;
};

export type LeadResponse = {
  ok: boolean;
  referenceId: string;
  error?: string;
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
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as LeadResponse;
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to submit. Please try again.");
  }
  return data;
}
