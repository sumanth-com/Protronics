"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_STORIES, tradeInGlass, tradeInSection } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function CustomerStories() {
  const listMotion = useTradeInListMotion();

  return (
    <section id="stories" className={cn("relative py-12 sm:py-20", tradeInSection)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="RECENT TRADE-INS"
            title="Real Trade-Ins, Real Value"
            description="Customers who sold or traded in through Protronics—not classifieds or scrap dealers."
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
              key={`${story.appliance}-${story.name}`}
              variants={listMotion.child}
              className={cn(
                "trade-in-story-card w-[min(300px,85vw)] shrink-0 p-5 sm:w-auto sm:p-6",
                tradeInGlass,
              )}
            >
              <p className="text-[12px] font-medium uppercase tracking-wide text-theme-fg-faint">
                {story.appliance}
              </p>
              <p className="mt-2 text-[26px] font-semibold tracking-tight text-theme-accent">
                Sold for {story.soldFor}
              </p>
              <p className="mt-3 text-[14px] leading-6 text-theme-fg">{story.outcome}</p>
              <footer className="mt-4 border-t border-theme-border pt-3">
                <p className="text-[13px] font-medium text-theme-fg">{story.name}</p>
                <p className="text-[12px] text-theme-fg-faint">{story.location}</p>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
