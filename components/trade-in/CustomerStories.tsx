"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_STORIES, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function CustomerStories() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="stories" className="relative bg-black py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="CUSTOMER STORIES"
            title="Real Upgrades, Real Savings"
            description="Customers who traded in and upgraded through Protronics—not a scrap dealer or classifieds."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="trade-in-scroll-x mt-8 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0"
          data-lenis-prevent
        >
          {TRADE_IN_STORIES.map((story) => (
            <motion.article
              key={story.name}
              variants={listMotion.child}
              className={cn(
                "trade-in-story-card w-[min(300px,85vw)] shrink-0 p-5 sm:w-auto sm:p-6",
                tradeInGlass,
              )}
            >
              <Quote className="h-5 w-5 text-white/40" aria-hidden />
              <p className="mt-3 text-[14px] font-semibold leading-snug text-white">
                Traded {story.traded.toLowerCase()}
              </p>
              <p className="mt-2 text-[22px] font-semibold tracking-tight text-theme-accent">
                Saved {story.saved}
              </p>
              <p className="mt-3 text-[13px] leading-6 text-white/65">{story.outcome}</p>
              <footer className="mt-4 border-t border-white/10 pt-3">
                <p className="text-[13px] font-medium text-white">{story.name}</p>
                <p className="text-[12px] text-white/45">{story.location}</p>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
