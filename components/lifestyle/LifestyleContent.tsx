"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import CTAButtons from "@/components/lifestyle/CTAButtons";

export type LifestyleContentProps = {
  className?: string;
};

export default function LifestyleContent({ className }: LifestyleContentProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
      className={cn("max-w-xl", className)}
    >
      <motion.p
        variants={fadeUp}
        className="text-[12px] font-medium tracking-[0.22em] text-white/55"
      >
        LIFESTYLE, ELEVATED
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className={cn(
          "mt-3 font-semibold tracking-tight text-white",
          "text-[36px] leading-[1.06]",
          "sm:text-[48px] sm:leading-[1.04]",
        )}
      >
        Luxury Comfort.
        <br />
        Sustainably Restored.
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-5 text-[14px] leading-7 text-white/70 sm:text-[15px]"
      >
        Premium appliances that feel right at home—clean lines, modern
        performance, and confidence you can feel. Refurbished, without the
        second‑hand vibe.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {[
          {
            title: "Designed for modern homes",
            desc: "Curated models with clean finishes and quiet performance.",
          },
          {
            title: "Professional restoration",
            desc: "Verified, sanitized, and performance‑checked end‑to‑end.",
          },
        ].map((b) => (
          <div
            key={b.title}
            className={cn(
              "rounded-2xl border border-white/12 bg-white/[0.05]",
              "px-4 py-4",
              "shadow-[0_22px_60px_rgba(0,0,0,0.55)]",
            )}
          >
            <div className="text-[13px] font-semibold text-white">
              {b.title}
            </div>
            <div className="mt-1 text-[12.5px] leading-6 text-white/70">
              {b.desc}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp}>
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}

