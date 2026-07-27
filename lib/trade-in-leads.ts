import { submitTradeInForm } from "@/lib/forms/submitters/tradeInSubmitter";
import { generateTradeInReferenceId } from "@/lib/trade-in";

export type TradeInLeadPayload = {
  name: string;
  phone: string;
  city: string;
  applianceType: string;
  brand: string;
  model: string;
  age: string;
  condition: string;
  description?: string;
  pageUrl: string;
  _honeypot?: string;
};

export type TradeInLeadResponse = {
  ok: boolean;
  referenceId: string;
  error?: string;
  message?: string;
};

export async function submitTradeInLead(
  payload: TradeInLeadPayload,
): Promise<TradeInLeadResponse> {
  const referenceId = generateTradeInReferenceId(payload.brand);

  const result = await submitTradeInForm(
    {
      name: payload.name,
      phone: payload.phone,
      city: payload.city,
      applianceType: payload.applianceType,
      brand: payload.brand,
      model: payload.model,
      age: payload.age,
      condition: payload.condition,
      description: payload.description ?? "",
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
