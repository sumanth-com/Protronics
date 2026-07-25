import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformProductLead(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.PRODUCT_LEAD,
    sourcePage: ctx.sourcePage ?? "/shop",
    data: {
      leadType: data.leadType,
      name: data.name,
      phone: data.phone,
      city: data.city,
      contactPreference: data.contactPreference,
      preferredTime: data.preferredTime,
      message: data.message,
      productName: data.productName,
      price: data.price,
      referenceId: data.referenceId,
    },
  });
}
