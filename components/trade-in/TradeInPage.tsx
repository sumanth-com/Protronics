"use client";

import TradeInHero from "@/components/trade-in/TradeInHero";
import TradeInEstimator from "@/components/trade-in/TradeInEstimator";
import SellForm from "@/components/trade-in/SellForm";
import TradeInFAQ from "@/components/trade-in/TradeInFAQ";

export default function TradeInPage() {
  return (
    <main className="trade-in-page flex-1 overflow-x-clip bg-theme-bg text-theme-fg">
      <TradeInHero />
      <TradeInEstimator />
      <SellForm />
      <TradeInFAQ />
    </main>
  );
}
