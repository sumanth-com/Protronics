"use client";

import SectionHeader from "@/components/contact/SectionHeader";
import SupportFeature from "@/components/warranty-support/SupportFeature";
import { MOBILE_WHY_CHOOSE_ITEMS } from "@/lib/why-choose";
import { cn } from "@/lib/utils";

type MobileWhyChooseSectionProps = {
  className?: string;
};

export default function MobileWhyChooseSection({ className }: MobileWhyChooseSectionProps) {
  return (
    <section
      id="why-choose"
      className={cn(
        "mobile-why-choose-home theme-section-b relative overflow-hidden bg-black",
        className,
      )}
      aria-labelledby="mobile-why-choose-heading"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeader
          eyebrow="Why Customers Choose Us"
          title="Engineered for Trust."
          description="Rigorously restored appliances with premium standards—refurbished that feels first-class."
          align="center"
          headingId="mobile-why-choose-heading"
        />

        <ul className="mobile-why-choose-grid mt-8 grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-3">
          {MOBILE_WHY_CHOOSE_ITEMS.map((item) => (
            <li key={item.title} className="min-w-0">
              <SupportFeature data={item} className="h-full !rounded-2xl" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
