"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/faq/FAQAccordion";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_FAQS, ABOUT_LINKS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";

export default function AboutFAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="about-faq-heading"
      className="about-page-section theme-section-a relative overflow-hidden bg-black"
    >
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp}>
            <SectionHeader
              headingId="about-faq-heading"
              eyebrow="FAQ"
              title="Questions About Protronics."
              description="Straight answers about our process, warranty, and support—before you buy."
              align="center"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6">
            <FAQAccordion faqs={ABOUT_FAQS} defaultOpenIndex={0} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-center text-[14px] leading-7 text-white/60"
          >
            Need more detail?{" "}
            <Link href={ABOUT_LINKS.support} className="font-medium text-white hover:underline">
              Visit the Help Center
            </Link>{" "}
            or{" "}
            <a
              href={ABOUT_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white hover:underline"
            >
              chat on WhatsApp
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
