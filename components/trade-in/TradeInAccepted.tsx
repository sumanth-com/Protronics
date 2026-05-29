"use client";

import { motion } from "framer-motion";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import {
  ACCEPTED_BRANDS,
  APPLIANCE_CATEGORIES,
  tradeInGlass,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

export default function TradeInAccepted() {
  return (
    <section id="accepted" className="relative border-y border-white/[0.06] bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="WHAT WE ACCEPT"
            title="Premium Appliances We Evaluate"
            description="We accept leading brands across major home appliance categories."
          />
        </TradeInReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {APPLIANCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className={cn(
                  "group relative overflow-hidden p-5",
                  tradeInGlass,
                  "min-h-[140px]",
                )}
              >
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 text-[14px] font-semibold text-white">
                    {cat.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <TradeInReveal className="mt-12" delay={0.1}>
          <p className="text-[12px] font-medium tracking-[0.18em] text-white/45">
            ACCEPTED BRANDS
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {ACCEPTED_BRANDS.map((brand) => (
              <span
                key={brand}
                className={cn(
                  "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2",
                  "text-[13px] font-medium text-white/80",
                  "transition-colors hover:border-white/25 hover:text-white",
                )}
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
