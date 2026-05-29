"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { TRADE_IN_STEPS, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInSteps() {
  return (
    <section id="how-it-works" className="relative bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="HOW IT WORKS"
            title="Four Simple Steps"
            description="Understand the full trade-in journey in under ten seconds."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRADE_IN_STEPS.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group relative overflow-hidden p-6", tradeInGlass)}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[13px] font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-white/60">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
