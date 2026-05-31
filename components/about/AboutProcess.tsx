"use client";

import { motion } from "framer-motion";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_PROCESS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function AboutProcess() {
  return (
    <section
      id="process"
      aria-labelledby="about-process-heading"
      className="theme-section-b relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <AboutAmbient />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-process-heading"
          eyebrow="HOW WE WORK"
          title="From Inspection to Your Door."
          description="A clear restoration pipeline—so you know exactly what premium refurbished means at Protronics."
          align="center"
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-12 grid list-none gap-4 p-0 lg:grid-cols-3 lg:gap-5"
        >
          {ABOUT_PROCESS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className={cn(
                  "about-process-card relative overflow-hidden rounded-2xl",
                  "border border-white/12 bg-white/[0.04] px-6 py-6",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </div>
                  <span className="text-[12px] font-semibold tracking-[0.18em] text-white/35">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-white/68">{item.description}</p>
                {idx < ABOUT_PROCESS.length - 1 ? (
                  <span
                    className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-white/10 lg:block"
                    aria-hidden
                  />
                ) : null}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
