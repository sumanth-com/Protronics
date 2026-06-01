import type { Metadata } from "next";
import WhyPage from "@/components/why/WhyPage";
import { whyPageJsonLd } from "@/lib/why";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Why Protronics | Trust & Quality You Can Verify",
  description:
    "Why trust Protronics over local dealers or marketplace sellers? 100+ quality checks, warranty, sanitization, certified performance, and expert support.",
  path: "/why-protronics",
  keywords: [
    "why Protronics",
    "refurbished refrigerator trust",
    "Protronics vs OLX",
  ],
});

export default function WhyProtronicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whyPageJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <WhyPage />
      </div>
    </>
  );
}
