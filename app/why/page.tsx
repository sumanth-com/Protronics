import type { Metadata } from "next";
import WhyPage from "@/components/why/WhyPage";
import { whyPageJsonLd } from "@/lib/why";

export const metadata: Metadata = {
  title: "Why Protronics | Trust & Quality You Can Verify",
  description:
    "Why trust Protronics over local dealers or marketplace sellers? 100+ quality checks, warranty, sanitization, certified performance, and expert support.",
  keywords: [
    "why Protronics",
    "refurbished refrigerator trust",
    "Protronics vs OLX",
    "premium refurbished appliances",
    "appliance warranty",
  ],
  openGraph: {
    title: "Why Protronics | The Safer Way to Buy Refurbished",
    description:
      "Compare Protronics to local dealers and marketplace sellers—verified quality, warranty, and support.",
    type: "website",
  },
};

export default function Why() {
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
