import { NextResponse } from "next/server";
import { appendTradeInToSheet } from "@/lib/google-sheets-trade-in";
import { generateTradeInReferenceId } from "@/lib/trade-in";
import type { TradeInLeadPayload } from "@/lib/trade-in-leads";

function isValidPhone(phone: string) {
  return /^[\d\s+\-()]{8,15}$/.test(phone.trim());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TradeInLeadPayload;

    if (
      !body.name?.trim() ||
      !body.phone?.trim() ||
      !body.city?.trim() ||
      !body.applianceType?.trim() ||
      !body.brand?.trim() ||
      !body.model?.trim() ||
      !body.age?.trim() ||
      !body.condition?.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number." },
        { status: 400 },
      );
    }

    const referenceId = generateTradeInReferenceId(body.brand);
    const timestamp = new Date().toISOString();

    await appendTradeInToSheet({
      ...body,
      referenceId,
      timestamp,
    });

    return NextResponse.json({ ok: true, referenceId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
