import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformServiceRequest } from "@/lib/forms/transformers/serviceRequestTransformer";
import type { ServiceRequestValues } from "@/lib/forms/validators/serviceRequestValidator";
import { validateServiceRequest } from "@/lib/forms/validators/serviceRequestValidator";

export const submitServiceRequestForm = createFormSubmitter<ServiceRequestValues>({
  validate: validateServiceRequest,
  transform: transformServiceRequest,
  defaultSourcePage: "/support",
});
