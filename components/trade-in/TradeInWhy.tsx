"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { TRADE_IN_WHY, tradeInGlass } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInWhy() {
  return (
    <section id="why-us" className="relative border-y border-white/[0.06] bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="WHY PROTRONICS"
            title="Why Trade With Protronics"
            description="A premium exchange experience—safer, simpler, and more trustworthy than classifieds."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRADE_IN_WHY.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={cn("group relative overflow-hidden p-6", tradeInGlass)}
              >
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/60">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
