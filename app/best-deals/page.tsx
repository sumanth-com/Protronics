import type { Metadata } from "next";
import BestDealsSection from "@/components/deals/BestDealsSection";

export const metadata: Metadata = {
  title: "Best Deals | Protronics",
  description:
    "Limited-time offers on premium refurbished refrigerators—best value, popular picks, and newly listed deals from Protronics.",
  alternates: { canonical: "/best-deals" },
  openGraph: {
    title: "Best Deals | Protronics",
    description:
      "Shop limited deals and top savings on certified refurbished appliances.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Deals | Protronics",
    description:
      "Shop limited deals and top savings on certified refurbished appliances.",
  },
};

export default function BestDealsPage() {
  return (
    <main className="best-deals-page bg-black pb-4 lg:pb-0">
      <BestDealsSection />
    </main>
  );
}
