"use client";

import dynamic from "next/dynamic";
import WhyHero from "@/components/why/WhyHero";
import DeferredMount from "@/components/layout/DeferredMount";

const WhyComparison = dynamic(() => import("@/components/why/WhyComparison"));
const WhyStandard = dynamic(() => import("@/components/why/WhyStandard"));
const WhyMetrics = dynamic(() => import("@/components/why/WhyMetrics"));
const WhyFinalCTA = dynamic(() => import("@/components/why/WhyFinalCTA"));

export default function WhyPage() {
  return (
    <main>
      <WhyHero />
      <DeferredMount minHeight="520px">
        <WhyComparison />
      </DeferredMount>
      <DeferredMount minHeight="480px">
        <WhyStandard />
      </DeferredMount>
      <DeferredMount minHeight="360px">
        <WhyMetrics />
      </DeferredMount>
      <DeferredMount minHeight="400px">
        <WhyFinalCTA />
      </DeferredMount>
    </main>
  );
}
