import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { buildLegalPageJsonLd, TERMS_OF_SERVICE_PAGE } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";

const page = TERMS_OF_SERVICE_PAGE;

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: page.seo.title,
  description: page.seo.description,
  path: page.path,
  keywords: [...page.seo.keywords],
});

export default function TermsOfServicePage() {
  const jsonLd = buildLegalPageJsonLd(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <LegalPage config={page} />
      </main>
    </>
  );
}
