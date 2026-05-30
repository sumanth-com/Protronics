import type { Metadata } from "next";
import { buildBreadcrumbJsonLd } from "@/lib/faq";
import { SITE_DESCRIPTION } from "@/lib/site";
import WarrantySupport from "@/components/warranty-support/WarrantySupport";
import FinalCTA from "@/components/final-cta/FinalCTA";

export const metadata: Metadata = {
  title: "Warranty & Support | Protronics",
  description:
    "1-year warranty, delivery & installation, and dedicated support for every premium renewed appliance from Protronics.",
  alternates: { canonical: "/warranty" },
  openGraph: {
    title: "Warranty & Support | Protronics",
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Warranty & Support | Protronics",
    description: SITE_DESCRIPTION,
  },
};

export default function WarrantyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Warranty", path: "/warranty" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <WarrantySupport />
        <FinalCTA />
      </div>
    </>
  );
}
