import { NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { generateReferenceId, type LeadPayload } from "@/lib/leads";
import { SHOP_PRODUCTS } from "@/lib/shop";

function isValidPhone(phone: string) {
  return /^[\d\s+\-()]{8,15}$/.test(phone.trim());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name?.trim() || !body.phone?.trim() || !body.productId || !body.productName) {
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

    if (body.leadType === "reserve" && !body.city?.trim()) {
      return NextResponse.json(
        { ok: false, error: "City is required for reservations." },
        { status: 400 },
      );
    }

    const product = SHOP_PRODUCTS.find((p) => p.id === body.productId);
    const referenceId = generateReferenceId({
      brand: product?.brand ?? body.productName.split(" ")[0] ?? "PR",
      capacity: product?.capacity ?? "",
    });

    const timestamp = new Date().toISOString();

    await appendLeadToSheet({
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
