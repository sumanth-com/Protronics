import type { Metadata } from "next";
import FAQSection from "@/components/faq/FAQSection";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, HOMEPAGE_FAQS } from "@/lib/faq";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Premium Refurbished Appliances | Protronics",
  description:
    "Clear answers about warranty, testing, delivery, sanitization, and what makes Protronics premium refurbished appliances different.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Protronics FAQ",
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Protronics FAQ",
    description: SITE_DESCRIPTION,
  },
};

export default function FAQPage() {
  const faqJsonLd = buildFaqJsonLd(HOMEPAGE_FAQS);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <FAQSection />
      </div>
    </>
  );
}
