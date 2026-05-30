"use client";

import {
  BadgeCheck,
  Headset,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import SectionHeader from "@/components/contact/SectionHeader";
import SupportFeature, {
  type SupportFeatureData,
} from "@/components/warranty-support/SupportFeature";
import SupportCTA from "@/components/warranty-support/SupportCTA";
import WarrantyHighlights from "@/components/warranty-support/WarrantyHighlights";
import { cn } from "@/lib/utils";

const features: SupportFeatureData[] = [
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    description: "Coverage starts on your delivery date—service-backed, no guesswork.",
  },
  {
    icon: Wrench,
    title: "Free Repairs",
    description: "Compressor, cooling, and electrical faults handled by our team.",
  },
  {
    icon: BadgeCheck,
    title: "100+ Quality Checks",
    description: "Every unit tested for safety, hygiene, and performance before dispatch.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "WhatsApp or phone—real advisors, fast claims in 24–48 hours.",
  },
];

export default function MobileWarrantySection({ className }: { className?: string }) {
  return (
    <section
      id="warranty-home"
      className={cn(
        "mobile-warranty-home theme-section-c relative overflow-hidden bg-black lg:hidden",
        className,
      )}
      aria-labelledby="mobile-warranty-heading"
    >
      <div className="section-seam-fade pointer-events-none absolute inset-x-0 -top-8 h-8 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="WARRANTY + SUPPORT"
          title="Warranty That Builds Confidence."
          description="If something ever feels off, you're covered. Premium support is part of every Protronics appliance."
          align="center"
          headingId="mobile-warranty-heading"
        />

        <ul className="mobile-warranty-features mt-8 grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-3">
          {features.map((f) => (
            <li key={f.title} className="min-w-0">
              <SupportFeature data={f} className="h-full !rounded-2xl" />
            </li>
          ))}
        </ul>

        <WarrantyHighlights
          className="mt-4 !rounded-2xl !px-4 !py-4"
          items={[
            "Certified testing",
            "Warranty included",
            "Expert support",
            "Safe delivery",
          ]}
        />

        <SupportCTA className="!mt-5" supportHref="/contact" />
      </div>
    </section>
  );
}
