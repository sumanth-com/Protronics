"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type Metric = {
  value: string;
  label: string;
  sublabel?: string;
};

export type TrustMetricsProps = {
  metrics: Metric[];
  className?: string;
};

export default function TrustMetrics({ metrics, className }: TrustMetricsProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
        className,
      )}
    >
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={fadeUp}
          className={cn(
            "rounded-3xl border border-white/12 bg-white/[0.05]",
            "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
            "premium-card",
            "px-4 py-4 sm:px-5 sm:py-5",
          )}
        >
          <div className="text-[20px] font-semibold tracking-tight text-white sm:text-[22px]">
            {m.value}
          </div>
          <div className="mt-1 text-[12px] font-medium tracking-wide text-white/75">
            {m.label}
          </div>
          {m.sublabel ? (
            <div className="mt-1 text-[12px] leading-5 text-white/55">
              {m.sublabel}
            </div>
          ) : null}
        </motion.div>
      ))}
    </motion.div>
  );
}

