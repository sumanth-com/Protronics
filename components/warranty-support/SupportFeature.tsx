"use client";

import { motion } from "framer-motion";
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
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/12 bg-black",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-5 py-5",
        className,
      )}
    >
<div className="relative flex items-start gap-3">
        <div
          className={cn(
            "relative grid h-11 w-11 shrink-0 place-items-center rounded-full",
            "border border-white/15 bg-white/[0.04]",
          )}
        >
          <Icon className="relative h-[18px] w-[18px] text-white" strokeWidth={1.75} />
        </div>

        <div className="min-w-0">
          <div className="text-[13px] font-semibold tracking-tight text-white">
            {data.title}
          </div>
          <div className="mt-1 text-[12.5px] leading-6 text-white/70">
            {data.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
