import type { Metadata } from "next";
import WhyPage from "@/components/why/WhyPage";
import { whyPageJsonLd } from "@/lib/why";
import { buildPageMetadata } from "@/lib/seo";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";

export const metadata: Metadata = buildPageMetadata({
  absoluteTitle: "Why Protronics | Trust & Quality You Can Verify",
  description:
    "Why trust Protronics over local dealers or marketplace sellers? 100+ quality checks, warranty, sanitization, certified performance, and expert support.",
  path: "/why-protronics",
  keywords: [
    "why Protronics",
    "refurbished refrigerator trust",
    "Protronics vs OLX",
    "certified refurbished appliances Bangalore",
  ],
});

export default function WhyProtronicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(whyPageJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <WhyPage />
      </div>
    </>
  );
}
