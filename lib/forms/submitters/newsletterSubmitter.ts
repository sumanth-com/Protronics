import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformNewsletter } from "@/lib/forms/transformers/newsletterTransformer";
import type { NewsletterValues } from "@/lib/forms/validators/newsletterValidator";
import { validateNewsletter } from "@/lib/forms/validators/newsletterValidator";

export const submitNewsletterForm = createFormSubmitter<NewsletterValues>({
  validate: validateNewsletter,
  transform: transformNewsletter,
  defaultSourcePage: "/",
});
