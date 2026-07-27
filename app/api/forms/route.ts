import { NextResponse } from "next/server";
import { forwardToAppsScript, isFormEndpointConfigured } from "@/lib/forms/forwardToAppsScript";
import { checkRateLimit, pruneRateLimitBuckets } from "@/lib/forms/rateLimit";
import { validateStandardPayload } from "@/lib/forms/serverValidate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Health check — does not expose the webhook URL. */
export async function GET() {
  return NextResponse.json({
    ready: isFormEndpointConfigured(),
    service: "forms",
  });
}

export async function POST(request: Request) {
  pruneRateLimitBuckets();

  const rate = checkRateLimit(`forms:${clientKey(request)}`);
  if (!rate.ok) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions. Please wait and try again.",
        code: "RATE_LIMIT",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body.", code: "PARSE" },
      { status: 400 },
    );
  }

  const validated = validateStandardPayload(body);
  if (!validated.ok) {
    if (validated.error === "HONEYPOT") {
      return NextResponse.json({
        success: true,
        message: "Submitted Successfully",
      });
    }
    return NextResponse.json(
      { success: false, error: validated.error, code: "VALIDATION" },
      { status: validated.status },
    );
  }

  const idempotencyKey =
    typeof (body as { idempotency_key?: unknown }).idempotency_key === "string"
      ? String((body as { idempotency_key: string }).idempotency_key)
      : undefined;

  const result = await forwardToAppsScript(validated.payload, { idempotencyKey });

  if (!result.success) {
    const status =
      result.code === "ENDPOINT" ? 503 : result.code === "NETWORK" ? 502 : 502;
    return NextResponse.json(
      { success: false, error: result.error, code: result.code },
      { status },
    );
  }

  return NextResponse.json({
    success: true,
    message: result.message,
    data: result.data,
  });
}
