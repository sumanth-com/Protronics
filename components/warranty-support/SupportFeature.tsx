"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SupportFeatureData = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type SupportFeatureProps = {
  data: SupportFeatureData;
  className?: string;
};

export default function SupportFeature({ data, className }: SupportFeatureProps) {
  const Icon = data.icon;

  return (
    <div
      className={cn(
        "warranty-feature-card group relative overflow-hidden rounded-3xl",
        "border border-white/12 bg-black",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-5 py-5",
        className,
      )}
    >
      <div className="relative flex items-start gap-3">
        <div className="warranty-feature-icon-wrap relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04]">
          <Icon className="warranty-feature-icon relative h-[18px] w-[18px] text-white" strokeWidth={1.75} />
        </div>

        <div className="min-w-0">
          <div className="warranty-feature-title text-[13px] font-semibold tracking-tight text-white">
            {data.title}
          </div>
          <div className="warranty-feature-desc mt-1 text-[12.5px] leading-6 text-white/70">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}
