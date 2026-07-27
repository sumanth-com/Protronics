import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildBreadcrumbJsonLd } from "@/lib/faq";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";

const HowItWorks = dynamic(
  () => import("@/components/how-it-works/HowItWorks"),
);
const FinalCTA = dynamic(() => import("@/components/final-cta/FinalCTA"));

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: PAGE_SEO.howItWorks.absoluteTitle,
  description: PAGE_SEO.howItWorks.description,
  path: PAGE_SEO.howItWorks.path,
  keywords: [...PAGE_SEO.howItWorks.keywords],
});

export default function HowItWorksPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <HowItWorks />
        <FinalCTA />
      </div>
    </>
  );
}
