"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "premium-card group relative overflow-hidden rounded-2xl",
        "border border-white/12 bg-black",
        "px-6 py-6",
        "h-[206px] sm:h-[214px] lg:h-[224px]",
        "transition-transform duration-150 ease-out hover:-translate-y-0.5",
        className,
      )}
    >
<div className="relative flex h-full flex-col">
        <div
          className={cn(
            "relative grid h-12 w-12 place-items-center rounded-full",
            "border border-white/15 bg-white/[0.04]",
          )}
        >
          <Icon className="relative h-[18px] w-[18px] text-white" strokeWidth={1.75} />
        </div>

        <div
          className={cn(
            "mt-4 text-[14px] font-semibold leading-snug tracking-tight text-white",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          )}
        >
          {title}
        </div>

        <div className="theme-accent-line mt-3 w-10" />

        <div
          className={cn(
            "mt-4 text-[12.5px] leading-6 text-white/65",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
          )}
        >
          {description}
        </div>

        <div className="mt-auto" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)] opacity-40" />
    </motion.div>
  );
}
