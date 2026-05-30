"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, { TradeInReveal } from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_FAQS } from "@/lib/trade-in";
import FAQAccordion from "@/components/faq/FAQAccordion";

export default function TradeInFAQ() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="trade-in-faq" className="relative border-t border-white/[0.06] bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="FAQ"
            title="Trade-In Questions"
            description="Clear answers so you can upgrade with confidence."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="mt-8 sm:mt-10"
        >
          <motion.div variants={listMotion.child}>
            <FAQAccordion faqs={[...TRADE_IN_FAQS]} defaultOpenIndex={0} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
