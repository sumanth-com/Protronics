"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessStepData = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProcessStepProps = {
  data: ProcessStepData;
  active?: boolean;
  className?: string;
};

export default function ProcessStep({
  data,
  active = false,
  className,
}: ProcessStepProps) {
  const Icon = data.icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "premium-card group relative h-full overflow-hidden rounded-3xl",
        "border border-white/12 bg-black",
        "px-6 py-6",
        "will-change-transform",
        className,
      )}
    >
<div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-medium tracking-[0.22em] text-white/55">
            STEP {data.step}
          </div>
          <div
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full",
              "border border-white/15 bg-white/[0.04]",
            )}
          >
            <Icon className="relative h-[18px] w-[18px] text-white" strokeWidth={1.75} />
          </div>
        </div>

        <div
          className={cn(
            "mt-4 text-[16px] font-semibold leading-snug tracking-tight text-white",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          )}
        >
          {data.title}
        </div>

        <div className="theme-accent-line mt-3 w-10" />

        <div className="mt-4 text-[12.5px] leading-6 text-white/70">
          {data.description}
        </div>

        <div className="mt-auto" />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700",
          active ? "opacity-100" : "",
        )}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.35),transparent)] opacity-70" />
      </div>
    </motion.div>
  );
}
