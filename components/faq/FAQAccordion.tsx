"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import FAQItem, { type FAQ } from "@/components/faq/FAQItem";

export type FAQAccordionProps = {
  faqs: FAQ[];
  defaultOpenIndex?: number;
};

export default function FAQAccordion({
  faqs,
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const safeDefault = Math.max(0, Math.min(faqs.length - 1, defaultOpenIndex));
  const [openIndex, setOpenIndex] = useState<number>(safeDefault);

  const rows = useMemo(() => faqs, [faqs]);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      className="faq-accordion space-y-3 sm:space-y-4"
    >
      {rows.map((f, idx) => (
        <motion.div key={f.question} variants={fadeUp}>
          <FAQItem
            item={f}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex((prev) => (prev === idx ? -1 : idx))}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

