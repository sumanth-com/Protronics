"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/about/AnimatedCounter";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { WHY_METRICS } from "@/lib/why";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function WhyMetrics() {
  return (
    <section aria-labelledby="why-metrics-heading" className="relative overflow-hidden bg-black py-16 sm:py-20">
      <AboutAmbient variant="section" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="why-metrics-heading"
          eyebrow="NUMBERS THAT BUILD CONFIDENCE"
          title="Proof, Not Promises."
          align="center"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {WHY_METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className={cn(
                "rounded-3xl border border-white/12 bg-white/[0.05]",
                "supports-[backdrop-filter]:backdrop-blur-xl",
                "px-5 py-8 text-center sm:px-6 sm:py-10",
              )}
            >
              <div className="text-[36px] font-semibold leading-none tracking-tight text-white sm:text-[44px] lg:text-[48px]">
                {metric.animate ? (
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                ) : (
                  <span>{metric.display}</span>
                )}
              </div>
              <p className="mt-3 text-[14px] font-medium text-white/75">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
