"use client";

import { ArrowUpRight, Headset } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export type SupportCTAProps = {
  warrantyHref?: string;
  supportHref?: string;
  className?: string;
};

export default function SupportCTA({
  warrantyHref = "#warranty",
  supportHref = "#contact",
  className,
}: SupportCTAProps) {
  return (
    <div className={cn("mt-7 flex flex-col gap-3 sm:flex-row", className)}>
      <a href={warrantyHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-5 py-3",
            "bg-white text-black",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
            "ring-1 ring-white/10",
          )}
        >
          View Warranty Details
          <ArrowUpRight className="ml-2 h-4 w-4 opacity-85" />
        </MagneticButton>
      </a>

      <a href={supportHref} className="w-full sm:w-auto">
        <MagneticButton
          className={cn(
            "w-full rounded-full px-5 py-3",
            "border border-white/12 bg-white/[0.06] text-white",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_18px_50px_rgba(0,0,0,0.55)]",
          )}
        >
          Contact Support
          <Headset className="ml-2 h-4 w-4 opacity-80" />
        </MagneticButton>
      </a>
    </div>
  );
}

