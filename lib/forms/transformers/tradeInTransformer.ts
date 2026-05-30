import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformTradeIn(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.TRADE_IN,
    sourcePage: ctx.sourcePage ?? "/trade-in",
    data: {
      referenceId: data.referenceId,
      name: data.name,
      phone: data.phone,
      city: data.city,
      applianceType: data.applianceType,
      brand: data.brand,
      model: data.model,
      age: data.age,
      condition: data.condition,
      expectedPrice: data.expectedPrice,
      estimatedLow: data.estimatedLow ? Number(data.estimatedLow) : 0,
      estimatedHigh: data.estimatedHigh ? Number(data.estimatedHigh) : 0,
      imageCount: Number(data.imageCount) || 0,
      imageNames: data.imageNames,
      leadSource: data.leadSource,
    },
  });
}
