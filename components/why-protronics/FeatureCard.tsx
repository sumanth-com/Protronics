"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "cool" | "neutral";
  className?: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "cool",
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/12 bg-white/[0.06]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_22px_60px_rgba(0,0,0,0.45)]",
        "px-6 py-6",
        // lock uniform tile size (desktop reference: perfect grid balance)
        "h-[206px] sm:h-[214px] lg:h-[224px]",
        "will-change-transform",
        className,
      )}
    >
      {/* ambient sheen */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          tone === "cool"
            ? "bg-[radial-gradient(650px_260px_at_20%_0%,rgba(255,90,85,0.22),transparent_55%),radial-gradient(520px_240px_at_80%_20%,rgba(255,255,255,0.08),transparent_55%)]"
            : "bg-[radial-gradient(650px_260px_at_20%_0%,rgba(255,255,255,0.08),transparent_55%)]",
        )}
      />

      <div className="relative flex h-full flex-col">
        <div
          className={cn(
            "relative grid h-12 w-12 place-items-center rounded-full",
            "border border-white/12 bg-white/[0.06]",
            "shadow-[0_18px_40px_rgba(0,0,0,0.55)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,90,85,0.18),transparent_60%)]" />
          <Icon className="relative h-[18px] w-[18px] text-[#ff5a55]/90" />
        </div>

        <div
          className={cn(
            "mt-4 text-[14px] font-semibold leading-snug tracking-tight text-white",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          )}
        >
          {title}
        </div>

        <div className="mt-3 h-[2px] w-10 rounded-full bg-[#ff5a55]/70" />

        <div
          className={cn(
            "mt-4 text-[12.5px] leading-6 text-white/70",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
          )}
        >
          {description}
        </div>

        <div className="mt-auto" />
      </div>

      {/* premium micro-line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(255,90,85,0.55),transparent)] opacity-45" />
    </motion.div>
  );
}

