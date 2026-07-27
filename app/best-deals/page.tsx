import type { Metadata } from "next";
import BestDealsSection from "@/components/deals/BestDealsSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Deals on Refurbished Appliances",
  description:
    "Shop discounted certified refurbished refrigerators and washing machines in Bangalore—best value picks with warranty, testing, and delivery from Protronics.",
  path: "/best-deals",
  keywords: [
    "refurbished refrigerator deals",
    "discount refurbished fridge bangalore",
    "best refurbished appliances",
  ],
});

export default function BestDealsPage() {
  return (
    <main className="best-deals-page bg-black pb-4 lg:pb-0">
      <BestDealsSection />
    </main>
  );
}
