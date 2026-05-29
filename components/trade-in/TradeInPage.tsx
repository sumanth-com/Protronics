"use client";

import dynamic from "next/dynamic";
import TradeInHero from "@/components/trade-in/TradeInHero";
import TradeInSteps from "@/components/trade-in/TradeInSteps";
import DeferredMount from "@/components/layout/DeferredMount";

const TradeInAccepted = dynamic(
  () => import("@/components/trade-in/TradeInAccepted"),
);
const TradeInEstimator = dynamic(
  () => import("@/components/trade-in/TradeInEstimator"),
);
const TradeInValuationForm = dynamic(
  () => import("@/components/trade-in/TradeInValuationForm"),
);
const TradeInWhy = dynamic(() => import("@/components/trade-in/TradeInWhy"));
const TradeInFinalCTA = dynamic(
  () => import("@/components/trade-in/TradeInFinalCTA"),
);

export default function TradeInPage() {
  return (
    <main>
      <TradeInHero />
      <TradeInSteps />
      <DeferredMount minHeight="520px">
        <TradeInAccepted />
      </DeferredMount>
      <DeferredMount minHeight="560px">
        <TradeInEstimator />
      </DeferredMount>
      <TradeInValuationForm />
      <DeferredMount minHeight="480px">
        <TradeInWhy />
      </DeferredMount>
      <TradeInFinalCTA />
    </main>
  );
}
