"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { HOMEPAGE_FAQS } from "@/lib/faq";
import { cn } from "@/lib/utils";
import FAQAccordion from "@/components/faq/FAQAccordion";

export default function FAQSection() {
  return (
    <section id="faq" className="theme-section-a relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16 sm:pb-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className="mx-auto flex max-w-3xl flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "type-section-title mt-3 text-center font-semibold tracking-tight text-white",
              "text-[34px] leading-[1.06]",
              "sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Clear Answers. Confident Decisions.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            Premium answers, without noise—so you can buy refurbished with total
            confidence.
          </motion.p>
        </motion.div>

        <div className="faq-section-body mt-10 sm:mt-12">
          <FAQAccordion faqs={HOMEPAGE_FAQS} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
