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
        "border border-white/12 bg-white/[0.05]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-5 py-5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(680px_260px_at_15%_0%,rgba(255,90,85,0.18),transparent_58%),radial-gradient(520px_240px_at_85%_20%,rgba(255,255,255,0.07),transparent_55%)]" />

      <div className="relative flex items-start gap-3">
        <div
          className={cn(
            "relative grid h-11 w-11 shrink-0 place-items-center rounded-full",
            "border border-white/12 bg-white/[0.06]",
            "shadow-[0_18px_40px_rgba(0,0,0,0.55)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,85,0.18),transparent_60%)]" />
          <Icon className="relative h-[18px] w-[18px] text-[#ff5a55]/90" />
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

