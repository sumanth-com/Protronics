"use client";

import { ArrowUpRight, PhoneCall } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

export type CTAButtonsProps = {
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
};

export default function CTAButtons({
  primaryHref = "#shop",
  secondaryHref = "/contact",
  className,
}: CTAButtonsProps) {
  return (
    <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row", className)}>
      <CtaButton href={primaryHref} fullWidth className="sm:w-auto">
        Explore Collection
        <ArrowUpRight className="h-4 w-4" />
      </CtaButton>

      <CtaButton href={secondaryHref} fullWidth className="sm:w-auto">
        Talk to an Expert
        <PhoneCall className="h-4 w-4" />
      </CtaButton>
    </div>
  );
}
