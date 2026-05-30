import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildBreadcrumbJsonLd } from "@/lib/faq";
import { SITE_DESCRIPTION } from "@/lib/site";

const HowItWorks = dynamic(
  () => import("@/components/how-it-works/HowItWorks"),
);
const FinalCTA = dynamic(() => import("@/components/final-cta/FinalCTA"));

export const metadata: Metadata = {
  title: "How It Works | Premium Refurbished Appliances | Protronics",
  description:
    "From sourcing to delivery—see how Protronics renews premium appliances through 100+ checks, deep sanitization, and warranty-backed support.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Protronics Works",
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Protronics Works",
    description: SITE_DESCRIPTION,
  },
};

export default function HowItWorksPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-4 sm:px-6">
          <p className="text-[12px] font-medium tracking-[0.22em] text-white/55">
            Process
          </p>
          <h1 className="type-section-title mt-3 text-[34px] font-semibold tracking-tight sm:text-[44px]">
            How Protronics Works
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/70">
            A premium renewal system—from verified sourcing to warranty-backed
            delivery. Engineered to make refurbished feel first-class.
          </p>
        </div>
        <HowItWorks />
        <FinalCTA />
      </div>
    </>
  );
}
