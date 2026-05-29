"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { fadeUp } from "@/lib/animations";
import { TRADE_IN_LINKS, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={fadeUp}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <div className={cn("px-6 py-12 sm:px-10 sm:py-14", tradeInGlass)}>
          <p className="text-[12px] font-medium tracking-[0.22em] text-white/50">
            UPGRADE TODAY
          </p>
          <h2 className="mt-3 text-[32px] font-semibold tracking-tight text-white sm:text-[40px]">
            Ready To Upgrade Your Appliance?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/65">
            Get a free valuation, receive a fair offer, and upgrade to a premium
            renewed appliance—all through one trusted partner.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <CtaButton href={TRADE_IN_LINKS.valuation} size="lg">
              Get Free Valuation
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href={TRADE_IN_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5",
                "border border-white/15 bg-white/[0.04] text-[13px] font-semibold text-white",
                "transition-colors hover:border-white/30 hover:bg-white/[0.08]",
              )}
            >
              <WhatsAppIcon className="h-4 w-4 text-white/85" />
              Chat On WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
