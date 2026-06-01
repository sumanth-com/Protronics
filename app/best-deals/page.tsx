import type { Metadata } from "next";
import BestDealsSection from "@/components/deals/BestDealsSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Deals on Refurbished Appliances",
  description:
    "Limited-time offers on premium refurbished refrigerators—best value, popular picks, and newly listed deals from Protronics.",
  path: "/best-deals",
});

export default function BestDealsPage() {
  return (
    <main className="best-deals-page bg-black pb-4 lg:pb-0">
      <BestDealsSection />
    </main>
  );
}
