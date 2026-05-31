import type { Metadata } from "next";
import TradeInPage from "@/components/trade-in/TradeInPage";
import { tradeInPageJsonLd } from "@/lib/trade-in";

export const metadata: Metadata = {
  title: "Sell Old Appliances | Trade-In Program | Protronics",
  description:
    "Trade in or sell your old refrigerator and appliances. Get a fair valuation, upgrade affordably, and enjoy a hassle-free experience with Protronics.",
  keywords: [
    "sell old refrigerator",
    "trade in fridge",
    "appliance exchange",
    "sell old appliance",
    "refrigerator trade in",
    "appliance trade-in",
    "Protronics trade-in",
  ],
  alternates: {
    canonical: "/sell",
  },
  openGraph: {
    title: "Sell Old Appliances | Trade-In Program | Protronics",
    description:
      "Trade in or sell your old refrigerator and appliances. Get a fair valuation and upgrade affordably.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sell Old Appliances | Trade-In Program | Protronics",
    description:
      "Fair appliance trade-in valuations with hassle-free pickup and upgrade options.",
  },
};

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tradeInPageJsonLd) }}
      />
      <TradeInPage />
    </>
  );
}
