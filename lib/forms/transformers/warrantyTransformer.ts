import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformWarrantyRegistration(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.WARRANTY_REGISTRATION,
    sourcePage: ctx.sourcePage ?? "/warranty",
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      serialNumber: data.serialNumber,
      purchaseDate: data.purchaseDate,
      model: data.model,
    },
  });
}
