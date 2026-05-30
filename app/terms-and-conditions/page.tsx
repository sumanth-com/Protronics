import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import {
  buildLegalPageJsonLd,
  TERMS_AND_CONDITIONS_PAGE,
} from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

const page = TERMS_AND_CONDITIONS_PAGE;

export const metadata: Metadata = {
  title: page.seo.title,
  description: page.seo.description,
  keywords: page.seo.keywords,
  alternates: { canonical: page.path },
  openGraph: {
    title: page.seo.title,
    description: page.seo.description,
    type: "website",
    url: absoluteUrl(page.path),
  },
  twitter: {
    card: "summary",
    title: page.seo.title,
    description: page.seo.description,
  },
};

export default function TermsAndConditionsPage() {
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
