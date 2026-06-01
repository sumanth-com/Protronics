import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformWarrantyRegistration } from "@/lib/forms/transformers/warrantyTransformer";
import type { WarrantyRegistrationValues } from "@/lib/forms/validators/warrantyValidator";
import { validateWarrantyRegistration } from "@/lib/forms/validators/warrantyValidator";

export const submitWarrantyForm = createFormSubmitter<WarrantyRegistrationValues>({
  validate: validateWarrantyRegistration,
  transform: transformWarrantyRegistration,
  defaultSourcePage: "/warranty",
});
