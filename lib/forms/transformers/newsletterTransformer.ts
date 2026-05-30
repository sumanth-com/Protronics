import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { buildStandardPayload } from "@/lib/forms/transformers/buildPayload";
import type { StandardFormPayload } from "@/lib/forms/types";

export function transformNewsletter(
  data: Record<string, string>,
  ctx: { sourcePage?: string },
): StandardFormPayload {
  return buildStandardPayload({
    formType: FORM_TYPES.NEWSLETTER,
    sourcePage: ctx.sourcePage ?? "/",
    data: { email: data.email },
  });
}
