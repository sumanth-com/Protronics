export type TradeInLeadPayload = {
  name: string;
  phone: string;
  city: string;
  applianceType: string;
  brand: string;
  model: string;
  age: string;
  condition: string;
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
};

export async function submitTradeInLead(
  payload: TradeInLeadPayload,
): Promise<TradeInLeadResponse> {
  const res = await fetch("/api/trade-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as TradeInLeadResponse;
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? "Failed to submit. Please try again.");
  }
  return data;
}
