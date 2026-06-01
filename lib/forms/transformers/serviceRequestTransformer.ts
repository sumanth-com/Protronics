import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformServiceRequest(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.SERVICE_REQUEST,
    sourcePage: ctx.sourcePage ?? "/support",
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      issue: data.issue,
      preferredTime: data.preferredTime,
    },
  });
}
