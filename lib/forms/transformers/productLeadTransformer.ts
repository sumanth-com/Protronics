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
      productName: data.productName,
      productId: data.productId,
      price: Number(data.price) || 0,
      name: data.name,
      phone: data.phone,
      city: data.city,
      contactPreference: data.contactPreference,
      message: data.message,
      preferredTime: data.preferredTime,
      leadSource: data.leadSource,
      referenceId: data.referenceId,
    },
  });
}
