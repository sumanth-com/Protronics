import type { Metadata } from "next";
import TradeInPage from "@/components/trade-in/TradeInPage";
import { tradeInPageJsonLd } from "@/lib/trade-in";

export const metadata: Metadata = {
  title: "Trade-In Old Appliances | Protronics",
  description:
    "Exchange your old refrigerator or appliance and upgrade to professionally restored premium appliances with Protronics Trade-In. Free evaluation, fair value, hassle-free pickup.",
  keywords: [
    "trade in refrigerator",
    "exchange old fridge",
    "appliance exchange",
    "refurbished appliance upgrade",
    "refrigerator trade in",
    "appliance trade-in",
    "Protronics trade-in",
  ],
  alternates: {
    canonical: "/trade-in",
  },
  openGraph: {
    title: "Trade-In Old Appliances | Protronics",
    description:
      "Turn your old appliance into savings. Trade in and upgrade to premium refurbished appliances.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Trade-In Old Appliances | Protronics",
    description:
      "Exchange your old appliance and upgrade affordably with Protronics Trade-In.",
  },
};

export default function TradeIn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tradeInPageJsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <TradeInPage />
      </div>
    </>
  );
}
