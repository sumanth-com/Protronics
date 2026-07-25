import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformTradeIn(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.TRADE_IN,
    sourcePage: ctx.sourcePage ?? "/sell",
    data: {
      name: data.name,
      phone: data.phone,
      city: data.city,
      applianceType: data.applianceType,
      brand: data.brand,
      model: data.model,
      age: data.age,
      condition: data.condition,
      description: data.description,
      referenceId: data.referenceId,
    },
  });
}
