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
        "group relative h-full overflow-hidden rounded-3xl",
        "border border-white/12 bg-white/[0.06]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-6 py-6",
        "will-change-transform",
        className,
      )}
    >
      {/* ambient sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(680px_260px_at_15%_0%,rgba(255,90,85,0.22),transparent_58%),radial-gradient(520px_240px_at_80%_20%,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-medium tracking-[0.22em] text-white/55">
            STEP {data.step}
          </div>
          <div
            className={cn(
              "relative grid h-11 w-11 place-items-center rounded-full",
              "border border-white/12 bg-white/[0.06]",
              "shadow-[0_18px_40px_rgba(0,0,0,0.55)]",
            )}
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,85,0.18),transparent_60%)]" />
            <Icon className="relative h-[18px] w-[18px] text-[#ff5a55]/90" />
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

        <div className="mt-3 h-[2px] w-10 rounded-full bg-[#ff5a55]/70" />

        <div className="mt-4 text-[12.5px] leading-6 text-white/70">
          {data.description}
        </div>

        <div className="mt-auto" />
      </div>

      {/* subtle active indicator */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700",
          active ? "opacity-100" : "",
        )}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,90,85,0.42),transparent)] opacity-70" />
      </div>
    </motion.div>
  );
}

