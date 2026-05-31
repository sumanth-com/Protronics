"use client";

import { motion } from "framer-motion";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_TRUST_STATS, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TrustBar() {
  const listMotion = useTradeInListMotion();

  return (
    <section className="border-b border-theme-border bg-theme-bg-secondary py-4 sm:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="trade-in-scroll-x flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0"
          data-lenis-prevent
        >
          {TRADE_IN_TRUST_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={listMotion.child}
                className={cn(
                  "flex min-w-[148px] shrink-0 items-center gap-2.5 px-3 py-2.5 sm:min-w-0",
                  tradeInGlass,
                )}
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-theme-accent/12 text-theme-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-semibold leading-snug text-theme-fg sm:text-[12px]">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
