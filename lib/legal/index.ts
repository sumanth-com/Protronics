import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { PRIVACY_POLICY_PAGE } from "@/lib/legal/privacy-content";
import { TERMS_AND_CONDITIONS_PAGE } from "@/lib/legal/terms-content";
import type { LegalPageConfig } from "@/lib/legal/types";

export type { LegalBlock, LegalPageConfig, LegalSection } from "@/lib/legal/types";
export { PRIVACY_POLICY_PAGE, TERMS_AND_CONDITIONS_PAGE };

export function getLegalPageByPath(path: string): LegalPageConfig | undefined {
  if (path === PRIVACY_POLICY_PAGE.path) return PRIVACY_POLICY_PAGE;
  if (path === TERMS_AND_CONDITIONS_PAGE.path) return TERMS_AND_CONDITIONS_PAGE;
  return undefined;
}

export function buildLegalPageJsonLd(page: LegalPageConfig) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(page.path),
        url: absoluteUrl(page.path),
        name: page.seo.title,
        description: page.seo.description,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@type": "Organization", name: SITE_NAME },
        dateModified: page.lastUpdated,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: absoluteUrl(page.path),
          },
        ],
      },
    ],
  };
}
