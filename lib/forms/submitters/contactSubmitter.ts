import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformContact } from "@/lib/forms/transformers/contactTransformer";
import type { ContactFormValues } from "@/lib/forms/validators/contactValidator";
import { validateContact } from "@/lib/forms/validators/contactValidator";

export const submitContactForm = createFormSubmitter<ContactFormValues>({
  validate: validateContact,
  transform: transformContact,
  defaultSourcePage: "/contact",
});
