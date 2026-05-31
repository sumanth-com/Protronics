"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/about/AnimatedCounter";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_METRICS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function AboutMetrics() {
  return (
    <section
      id="trust"
      aria-labelledby="about-metrics-heading"
      className="theme-section-c relative overflow-hidden bg-black py-16 sm:py-24"
    >
      <AboutAmbient variant="section" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-metrics-heading"
          eyebrow="NUMBERS THAT MATTER"
          title="Credibility You Can See."
          description="Trusted by thousands of households looking for premium refurbished appliances—with standards that stay consistent order after order."
          align="center"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {ABOUT_METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className={cn(
                "rounded-3xl border border-white/12 bg-white/[0.05]",
                "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
                "premium-card",
                "px-5 py-8 text-center sm:px-6 sm:py-10",
              )}
            >
              <div
                className={cn(
                  "font-semibold tracking-tight text-white",
                  "text-[36px] leading-none sm:text-[44px] lg:text-[48px]",
                )}
              >
                {metric.animate ? (
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                ) : (
                  <span>{metric.display}</span>
                )}
              </div>
              <p className="mt-3 text-[13px] font-medium tracking-wide text-white/75 sm:text-[14px]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
