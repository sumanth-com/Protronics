"use client";

import { motion } from "framer-motion";
import AboutAmbient from "@/components/about/AboutAmbient";
import AboutPromiseCard from "@/components/about/AboutPromiseCard";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_PROMISE } from "@/lib/about";
import { staggerCards } from "@/lib/animations";

export default function AboutPromise() {
  return (
    <section
      aria-labelledby="about-promise-heading"
      className="theme-section-b relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <AboutAmbient />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-promise-heading"
          eyebrow="THE PROTRONICS PROMISE"
          title="Built for Trust. Verified for You."
          description="Every appliance passes our restoration pipeline—so confidence is built in, not promised later."
          align="center"
        />

        <motion.div
          variants={staggerCards}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {ABOUT_PROMISE.map((item) => (
            <AboutPromiseCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
