"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TradeInSectionHeader, { TradeInReveal } from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { APPLIANCE_CATEGORIES, tradeInGlass, tradeInSection } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function CategorySelector() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="categories" className={cn("border-y border-theme-border py-12 sm:py-16", tradeInSection)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="APPLIANCE CATEGORIES"
            title="What Can You Sell?"
            description="Select your category when estimating value—we accept all major home appliance types."
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="trade-in-scroll-x -mx-1 mt-8 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-6"
          data-lenis-prevent
        >
          {APPLIANCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.id}
                href="#estimator"
                variants={listMotion.child}
                className={cn(
                  "trade-in-eligible-card w-[152px] shrink-0 overflow-hidden sm:w-auto",
                  tradeInGlass,
                  "transition-transform active:scale-[0.98]",
                )}
              >
                {cat.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-theme-border-subtle">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="152px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/80 to-transparent" />
                  </div>
                ) : null}
                <div className="p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-theme-accent/10 text-theme-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-2 text-[13px] font-semibold leading-snug text-theme-fg">
                    {cat.label}
                  </h3>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
