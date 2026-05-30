"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_BENEFITS, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function BenefitsSection() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="why-trade-in" className="relative border-y border-white/[0.06] bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="WHY TRADE-IN WITH PROTRONICS"
            title="Premium Exchange, Not Classifieds"
            description="Trustworthy, modern, and conversion-focused—like major brand upgrade programs."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {TRADE_IN_BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={listMotion.child}
                className={cn("p-4 sm:p-6", tradeInGlass)}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.06] sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <h3 className="mt-3 text-[13px] font-semibold leading-snug text-white sm:text-[15px]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-5 text-white/60 sm:mt-2 sm:text-[13px] sm:leading-6">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
