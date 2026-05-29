import type { LeadPayload } from "@/lib/leads";

export type SheetLeadRow = LeadPayload & {
  referenceId: string;
  timestamp: string;
};

/**
 * Appends a lead row via Google Apps Script web app.
 * Set GOOGLE_SHEETS_WEBHOOK_URL in .env.local to your deployed script URL.
 *
 * Sheet columns (row order):
 * Timestamp | Lead Type | Reference ID | Product Name | Product ID | Price |
 * Name | Phone | City | Contact Preference | Message | Preferred Time |
 * Lead Source | Page URL
 */
export async function appendLeadToSheet(row: SheetLeadRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.info("[leads] GOOGLE_SHEETS_WEBHOOK_URL not set — lead logged:", row);
      return;
    }
    throw new Error("Lead storage is not configured.");
  }

  const body = {
    timestamp: row.timestamp,
    leadType: row.leadType,
    referenceId: row.referenceId,
    productName: row.productName,
    productId: row.productId,
    price: row.price,
    name: row.name,
    phone: row.phone,
    city: row.city ?? "",
    contactPreference: row.contactPreference ?? "",
    message: row.message ?? "",
    preferredTime: row.preferredTime ?? "",
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
