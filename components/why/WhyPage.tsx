"use client";

import WhyComparison from "@/components/why/WhyComparison";
import WhyFinalCTA from "@/components/why/WhyFinalCTA";
import WhyHero from "@/components/why/WhyHero";
import WhyMetrics from "@/components/why/WhyMetrics";
import WhyStandard from "@/components/why/WhyStandard";

export default function WhyPage() {
  return (
    <main>
      <WhyHero />
      <WhyComparison />
      <WhyStandard />
      <WhyMetrics />
      <WhyFinalCTA />
    </main>
  );
}
