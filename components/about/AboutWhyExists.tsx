"use client";

import { motion } from "framer-motion";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_WHY_POINTS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function AboutWhyExists() {
  return (
    <section
      id="story"
      aria-labelledby="about-why-heading"
      className="theme-section-a relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <AboutAmbient />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-why-heading"
          eyebrow="OUR MISSION"
          title="Making Premium Appliances Accessible."
          description="We extend the life of quality appliances—restored, tested, and certified so you get premium results without premium showroom pricing."
          align="center"
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {ABOUT_WHY_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <motion.li
                key={point.title}
                variants={fadeUp}
                className={cn(
                  "list-none rounded-2xl border border-white/12 bg-white/[0.04]",
                  "px-6 py-6 text-center sm:text-left",
                )}
              >
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] sm:mx-0">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/65">{point.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
