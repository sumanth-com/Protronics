import type { Metadata } from "next";
import TradeInPage from "@/components/trade-in/TradeInPage";
import { tradeInPageJsonLd } from "@/lib/trade-in";

export const metadata: Metadata = {
  title: "Trade-In & Upgrade | Protronics",
  description:
    "Trade in your old appliance for fair value and upgrade to a premium professionally renewed appliance. Free evaluation, pickup assistance, and expert support.",
  keywords: [
    "appliance trade-in",
    "sell refrigerator",
    "exchange appliance",
    "Protronics trade-in",
    "upgrade appliance",
  ],
  alternates: {
    canonical: "/trade-in",
  },
  openGraph: {
    title: "Trade-In & Upgrade | Protronics",
    description:
      "Turn your old appliance into value. Free evaluation, fair pricing, and premium upgrades.",
    type: "website",
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
