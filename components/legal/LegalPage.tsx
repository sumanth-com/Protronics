"use client";

import type { LegalPageConfig } from "@/lib/legal/types";
import LegalBackToTop from "@/components/legal/LegalBackToTop";
import LegalContent from "@/components/legal/LegalContent";
import LegalHero from "@/components/legal/LegalHero";
import LegalSupportCard from "@/components/legal/LegalSupportCard";
import ReadingProgress from "@/components/legal/ReadingProgress";

type LegalPageProps = {
  config: LegalPageConfig;
};

export default function LegalPage({ config }: LegalPageProps) {
  return (
    <div className="legal-page min-h-screen">
      <ReadingProgress />
      <LegalHero
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        lastUpdated={config.lastUpdated}
      />

      <div className="legal-main relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="legal-content-panel rounded-2xl border px-5 py-8 sm:px-8 sm:py-10 lg:rounded-[24px] lg:px-10 lg:py-12">
          <LegalContent sections={config.sections} />
        </div>
        <LegalSupportCard />
      </div>

      <LegalBackToTop />
    </div>
  );
}
