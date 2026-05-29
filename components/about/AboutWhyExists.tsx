"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Sparkles } from "lucide-react";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_WHY_POINTS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const icons = [Recycle, Sparkles, Leaf] as const;

export default function AboutWhyExists() {
  return (
    <section
      aria-labelledby="about-why-heading"
      className="relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />
      <AboutAmbient />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-why-heading"
          eyebrow="WHY PROTRONICS EXISTS"
          title="Making Premium Appliances Accessible."
          description="We extend the life of quality appliances—restored, tested, and certified so you get premium results without premium pricing."
          align="center"
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {ABOUT_WHY_POINTS.map((point, idx) => {
            const Icon = icons[idx] ?? Sparkles;
            return (
              <motion.li
                key={point.title}
                variants={fadeUp}
                className={cn(
                  "list-none rounded-2xl border border-white/12 bg-white/[0.04]",
                  "px-6 py-6 text-center sm:text-left",
                )}
              >
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-[#39ff88]/10 sm:mx-0">
                  <Icon className="h-5 w-5 text-[#39ff88]/90" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-white/65">
                  {point.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
