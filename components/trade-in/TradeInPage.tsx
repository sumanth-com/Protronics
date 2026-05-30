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
const TradeInForm = dynamic(() => import("@/components/trade-in/TradeInForm"));
const BenefitsSection = dynamic(
  () => import("@/components/trade-in/BenefitsSection"),
);
const CustomerStories = dynamic(
  () => import("@/components/trade-in/CustomerStories"),
);
const TradeInFAQ = dynamic(() => import("@/components/trade-in/TradeInFAQ"));
const TradeInFinalCTA = dynamic(
  () => import("@/components/trade-in/TradeInFinalCTA"),
);

export default function TradeInPage() {
  return (
    <main className="trade-in-page overflow-x-clip">
      <TradeInHero />
      <TradeInSteps />
      <DeferredMount minHeight="480px">
        <TradeInAccepted />
      </DeferredMount>
      <DeferredMount minHeight="560px">
        <TradeInEstimator />
      </DeferredMount>
      <TradeInForm />
      <DeferredMount minHeight="520px">
        <BenefitsSection />
      </DeferredMount>
      <DeferredMount minHeight="400px">
        <CustomerStories />
      </DeferredMount>
      <DeferredMount minHeight="360px">
        <TradeInFAQ />
      </DeferredMount>
      <TradeInFinalCTA />
    </main>
  );
}
