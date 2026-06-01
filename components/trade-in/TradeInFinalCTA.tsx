"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_LINKS, tradeInGlass, tradeInSection } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInFinalCTA() {
  const { child, viewport } = useTradeInListMotion();

  return (
    <section className={cn("relative overflow-hidden py-14 sm:py-24", tradeInSection)}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={child}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <div className={cn("px-6 py-10 sm:px-10 sm:py-14", tradeInGlass)}>
          <p className="text-[12px] font-medium tracking-[0.22em] text-theme-fg-faint">
            START TODAY
          </p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-theme-fg sm:text-[40px]">
            Your Old Appliance Still Has Value.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-theme-fg-muted sm:text-[15px]">
            Get a free estimate today. Sell outright or apply credit toward a premium refurbished
            upgrade.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <CtaButton href={TRADE_IN_LINKS.valuation} size="lg">
              Get Valuation
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href={TRADE_IN_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3.5",
                "border border-theme-border bg-theme-surface-card text-[13px] font-semibold text-theme-fg",
                "transition-colors hover:border-theme-accent/40 hover:bg-theme-input-bg",
              )}
            >
              <WhatsAppIcon className="h-4 w-4 text-theme-accent" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
