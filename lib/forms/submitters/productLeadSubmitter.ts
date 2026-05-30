import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformProductLead } from "@/lib/forms/transformers/productLeadTransformer";
import type { ProductLeadValues } from "@/lib/forms/validators/productLeadValidator";
import { validateProductLead } from "@/lib/forms/validators/productLeadValidator";

export const submitProductLeadForm = createFormSubmitter<ProductLeadValues>({
  validate: validateProductLead,
  transform: transformProductLead,
  defaultSourcePage: "/shop",
});
