"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/contact/SectionHeader";
import SupportFeature from "@/components/warranty-support/SupportFeature";
import { ABOUT_WHY_CHOOSE } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";

export default function AboutWhyChoose() {
  return (
    <section
      id="why-choose"
      aria-labelledby="about-why-choose-heading"
      className="about-why-choose-home mobile-why-choose-home theme-section-b relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-why-choose-heading"
          eyebrow="WHY CUSTOMERS CHOOSE US"
          title="Engineered for Trust."
          description="Four reasons families pick Protronics over random classifieds or unverified sellers."
          align="center"
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-10 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:grid-cols-4"
        >
          {ABOUT_WHY_CHOOSE.map((item) => (
            <motion.li key={item.title} variants={fadeUp} className="min-w-0">
              <SupportFeature
                data={{
                  icon: item.icon,
                  title: item.title,
                  description: item.description,
                }}
                className="h-full !rounded-2xl"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
