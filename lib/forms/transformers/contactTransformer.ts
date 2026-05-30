import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformContact(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.CONTACT,
    sourcePage: ctx.sourcePage ?? "/contact",
    data: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      city: data.city,
      product: data.product,
      message: data.message,
    },
  });
}
