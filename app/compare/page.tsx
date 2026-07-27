import type { Metadata } from "next";
import ComparePageClient from "@/components/compare/ComparePageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Compare Refurbished Appliances",
  description:
    "Compare up to 3 certified refurbished refrigerators side-by-side in Bangalore. Capacity, price, warranty, and condition — decide faster with Protronics.",
  path: "/compare",
  keywords: [
    "compare refurbished refrigerators",
    "refurbished fridge comparison",
    "best refurbished refrigerator bangalore",
  ],
});

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ComparePageClient />
    </div>
  );
}
