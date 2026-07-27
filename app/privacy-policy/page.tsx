import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import {
  buildLegalPageJsonLd,
  PRIVACY_POLICY_PAGE,
} from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";

const page = PRIVACY_POLICY_PAGE;

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: page.seo.title,
  description: page.seo.description,
  path: page.path,
  keywords: [...page.seo.keywords],
});

export default function PrivacyPolicyPage() {
  const jsonLd = buildLegalPageJsonLd(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <main>
        <LegalPage config={page} />
      </main>
    </>
  );
}
