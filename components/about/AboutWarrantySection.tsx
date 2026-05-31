"use client";

import { ArrowUpRight, Headset } from "lucide-react";
import SectionHeader from "@/components/contact/SectionHeader";
import SupportFeature from "@/components/warranty-support/SupportFeature";
import WarrantyHighlights from "@/components/warranty-support/WarrantyHighlights";
import CtaButton from "@/components/ui/CtaButton";
import {
  ABOUT_WARRANTY_FEATURES,
  ABOUT_WARRANTY_HIGHLIGHTS,
  ABOUT_LINKS,
} from "@/lib/about";
import { cn } from "@/lib/utils";

export default function AboutWarrantySection() {
  return (
    <section
      id="warranty"
      aria-labelledby="about-warranty-heading"
      className="about-warranty-home mobile-warranty-home theme-section-c relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-warranty-heading"
          eyebrow="WARRANTY + SUPPORT"
          title="Coverage That Builds Confidence."
          description="If something feels off after delivery, you're not on your own. Warranty and real support are part of every Protronics appliance."
          align="center"
        />

        <ul className="mt-10 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-4">
          {ABOUT_WARRANTY_FEATURES.map((feature) => (
            <li key={feature.title} className="min-w-0">
              <SupportFeature data={feature} className="h-full !rounded-2xl" />
            </li>
          ))}
        </ul>

        <WarrantyHighlights
          className="mt-5 !rounded-2xl !px-5 !py-5 sm:!px-6 sm:!py-6"
          items={[...ABOUT_WARRANTY_HIGHLIGHTS]}
        />

        <div className={cn("mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center")}>
          <CtaButton href={ABOUT_LINKS.support} fullWidth className="sm:w-auto">
            Browse Help Center
            <ArrowUpRight className="h-4 w-4" />
          </CtaButton>
          <CtaButton href="/contact" fullWidth className="sm:w-auto">
            Contact Support
            <Headset className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
