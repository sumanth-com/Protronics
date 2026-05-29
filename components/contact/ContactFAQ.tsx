"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { contactGlass, greenGlow } from "@/lib/contact";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Do you provide installation?",
    answer:
      "Yes. White-glove delivery includes placement, leveling, and basic setup. Our team walks you through operation and care before they leave.",
  },
  {
    question: "How long is warranty?",
    answer:
      "Every Protronics refrigerator includes a 1-year comprehensive warranty covering parts and service, with optional extended coverage on select models.",
  },
  {
    question: "Can I visit before buying?",
    answer:
      "Absolutely. Book a visit or video demo to inspect finish, hear compressor performance, and review our 100+ point test report in person.",
  },
  {
    question: "Do you deliver to my city?",
    answer:
      "We deliver across metro Bengaluru and select surrounding districts. Share your pin code on WhatsApp—we'll confirm coverage and timelines instantly.",
  },
  {
    question: "How are products tested?",
    answer:
      "Each unit passes 100+ quality checks: cooling performance, electrical safety, sanitization, cosmetic refinishing, and final certification before listing.",
  },
] as const;

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-black py-16 sm:py-20">
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          <SectionHeader
            align="center"
            eyebrow="QUICK ANSWERS"
            title="Questions Customers Ask First"
            description="Clear, honest answers—so you can decide with confidence before reaching out."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div key={item.question} variants={fadeUp}>
                  <div
                    className={cn(
                      "group relative overflow-hidden",
                      contactGlass,
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="relative flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.06]"
                      >
                        <ChevronDown className="h-4 w-4 text-white/80" />
                      </motion.span>
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          greenGlow,
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <div className="h-px w-full bg-white/10" />
                            <p className="mt-4 text-[13px] leading-7 text-white/65">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
