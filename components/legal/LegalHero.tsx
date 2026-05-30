"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

type LegalHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
};

export default function LegalHero({ eyebrow, title, subtitle, lastUpdated }: LegalHeroProps) {
  return (
    <section className="legal-hero relative overflow-hidden">
      <div className="legal-hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="legal-hero-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-medium tracking-[0.24em] text-white/55 sm:text-[12px]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className={cn(
              "type-page-hero mt-4 font-semibold tracking-tight text-white",
              "text-[36px] leading-[1.06] sm:text-[48px] lg:text-[56px]",
            )}
          >
            {title}
          </motion.h1>
          <div className="theme-accent-line mx-auto mt-4 w-14" />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/70 sm:text-[16px] sm:leading-8"
          >
            {subtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-[12px] text-white/45">
            Last updated · {lastUpdated}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
