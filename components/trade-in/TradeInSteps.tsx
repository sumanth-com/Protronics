"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_STEPS } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInSteps() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="how-it-works" className="relative border-b border-theme-border bg-theme-bg py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="HOW TRADE-IN WORKS"
            title="Four Simple Steps"
            description="From sharing details to upgrading—designed like a premium exchange program, not a classified ad."
            align="center"
          />
        </TradeInReveal>

        <motion.ol
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="trade-in-timeline relative mt-10 space-y-0 sm:mt-12 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0"
        >
          {TRADE_IN_STEPS.map((item, index) => (
            <motion.li
              key={item.step}
              variants={listMotion.child}
              className={cn(
                "trade-in-timeline-step relative pb-8 pl-12 last:pb-0",
                "lg:flex lg:flex-col lg:pb-0 lg:pl-0 lg:pt-0",
              )}
            >
              <span
                className="trade-in-timeline-line absolute left-[18px] top-10 bottom-0 w-px bg-theme-border lg:hidden"
                aria-hidden
              />
              {index < TRADE_IN_STEPS.length - 1 ? (
                <span
                  className="trade-in-timeline-line-lg pointer-events-none absolute top-6 left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-theme-border lg:block"
                  aria-hidden
                />
              ) : null}

              <div
                className={cn(
                  "absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full",
                  "border border-theme-border bg-theme-surface-card text-[13px] font-bold text-theme-fg",
                  "lg:relative lg:mx-auto lg:mb-4",
                )}
              >
                {item.step}
              </div>

              <div className="lg:text-center">
                <h3 className="text-[15px] font-semibold text-theme-fg sm:text-[16px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-theme-fg-muted">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
