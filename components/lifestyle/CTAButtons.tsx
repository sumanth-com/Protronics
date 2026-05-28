"use client";

import { ArrowUpRight, PhoneCall } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export type CTAButtonsProps = {
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
};

export default function CTAButtons({
  primaryHref = "#shop",
  secondaryHref = "#contact",
  className,
}: CTAButtonsProps) {
  return (
    <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row", className)}>
      <a href={primaryHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-5 py-3",
            "bg-white text-black",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
            "ring-1 ring-white/10",
          )}
        >
          Explore Collection
          <ArrowUpRight className="ml-2 h-4 w-4 opacity-85" />
        </MagneticButton>
      </a>

      <a href={secondaryHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-5 py-3",
            "border border-white/12 bg-white/[0.06] text-white",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
          )}
        >
          Talk to an Expert
          <PhoneCall className="ml-2 h-4 w-4 opacity-80" />
        </MagneticButton>
      </a>
    </div>
  );
}

