import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildBreadcrumbJsonLd } from "@/lib/faq";
import WarrantySupport from "@/components/warranty-support/WarrantySupport";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

const FinalCTA = dynamic(() => import("@/components/final-cta/FinalCTA"));

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.warranty.title,
  description: PAGE_SEO.warranty.description,
  path: PAGE_SEO.warranty.path,
});

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
