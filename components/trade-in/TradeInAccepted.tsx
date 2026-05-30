"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import {
  ACCEPTED_BRANDS,
  APPLIANCE_CATEGORIES,
  tradeInGlass,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInAccepted() {
  const listMotion = useTradeInListMotion();

  return (
    <section
      id="eligible-appliances"
      className="relative border-y border-white/[0.06] bg-black py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="ELIGIBLE APPLIANCES"
            title="What You Can Trade In"
            description="Leading brands across major home appliance categories—we evaluate fairly, not like a scrap dealer."
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="trade-in-scroll-x -mx-1 mt-8 overflow-x-auto px-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-5"
          data-lenis-prevent
        >
          <div className="flex w-max gap-3 sm:contents sm:w-auto">
            {APPLIANCE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  variants={listMotion.child}
                  className={cn(
                    "trade-in-eligible-card w-[200px] shrink-0 overflow-hidden sm:w-auto",
                    tradeInGlass,
                  )}
                >
                  {cat.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
                    </div>
                  ) : null}
                  <div className="p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold text-white">
                      {cat.label}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <TradeInReveal className="mt-10" delay={0.1}>
          <p className="text-[12px] font-medium tracking-[0.18em] text-white/45">
            ACCEPTED BRANDS
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ACCEPTED_BRANDS.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-white/80 sm:px-4 sm:py-2 sm:text-[13px]"
              >
                {brand}
              </span>
            ))}
          </div>
        </TradeInReveal>
      </div>
    </section>
  );
}
