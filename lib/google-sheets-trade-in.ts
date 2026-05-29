import type { TradeInLeadPayload } from "@/lib/trade-in-leads";

export type TradeInSheetRow = TradeInLeadPayload & {
  referenceId: string;
  timestamp: string;
};

export async function appendTradeInToSheet(row: TradeInSheetRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info("[trade-in] GOOGLE_SHEETS_WEBHOOK_URL not set — lead logged:", row);
      return;
    }
    throw new Error("Lead storage is not configured.");
  }

  const body = {
    sheet: "TradeIn",
    timestamp: row.timestamp,
    leadType: "trade-in",
    referenceId: row.referenceId,
    name: row.name,
    phone: row.phone,
    city: row.city,
    applianceType: row.applianceType,
    brand: row.brand,
    model: row.model,
    age: row.age,
    condition: row.condition,
    expectedPrice: row.expectedPrice ?? "",
    estimatedLow: row.estimatedLow ?? "",
    estimatedHigh: row.estimatedHigh ?? "",
    imageCount: row.imageCount,
    imageNames: row.imageNames,
    leadSource: row.leadSource,
    pageUrl: row.pageUrl,
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed (${res.status})`);
  }
}
