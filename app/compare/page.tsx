import type { Metadata } from "next";
import ComparePageClient from "@/components/compare/ComparePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Compare Refurbished Appliances",
  description:
    "Compare up to 3 premium refurbished refrigerators side-by-side. Capacity, value, warranty, and expert guidance — decide faster with Protronics.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ComparePageClient />
    </div>
  );
}
