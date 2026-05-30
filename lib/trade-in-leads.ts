import { submitTradeInForm } from "@/lib/forms/submitters/tradeInSubmitter";
import { generateTradeInReferenceId } from "@/lib/trade-in";

export type TradeInLeadPayload = {
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
  imageCount: number;
  imageNames: string;
  estimatedLow?: number;
  estimatedHigh?: number;
  pageUrl: string;
  leadSource: string;
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
      email: payload.email ?? "",
      city: payload.city,
      applianceType: payload.applianceType,
      brand: payload.brand,
      model: payload.model,
      age: payload.age,
      condition: payload.condition,
      workingStatus: payload.workingStatus ?? "",
      description: payload.description ?? "",
      expectedPrice: payload.expectedPrice ?? "",
      estimatedLow:
        payload.estimatedLow !== undefined ? String(payload.estimatedLow) : "",
      estimatedHigh:
        payload.estimatedHigh !== undefined ? String(payload.estimatedHigh) : "",
      imageCount: String(payload.imageCount),
      imageNames: payload.imageNames,
      leadSource: payload.leadSource,
      referenceId,
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
