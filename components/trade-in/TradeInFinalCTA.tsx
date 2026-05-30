"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { TRADE_IN_LINKS, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInFinalCTA() {
  const { child, viewport } = useTradeInListMotion();

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={child}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <div className={cn("px-6 py-10 sm:px-10 sm:py-14", tradeInGlass)}>
          <p className="text-[12px] font-medium tracking-[0.22em] text-white/50">
            START YOUR UPGRADE
          </p>
          <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-white sm:text-[40px]">
            Your Old Appliance Still Has Value.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-white/65 sm:text-[15px]">
            You don&apos;t need to sell separately on classifieds. Trade in, get
            credit, and upgrade to a premium refurbished appliance through one
            trusted partner.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <CtaButton href={TRADE_IN_LINKS.estimator} size="lg">
              Get Trade-In Estimate
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href={TRADE_IN_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5",
                "border border-white/15 bg-white/[0.04] text-[13px] font-semibold text-white",
                "transition-colors hover:border-white/30 hover:bg-white/[0.08]",
              )}
            >
              <WhatsAppIcon className="h-4 w-4 text-white/85" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
