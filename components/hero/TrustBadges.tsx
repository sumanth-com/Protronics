"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const badges = [
  { icon: BadgeCheck, label: "Tested & Verified" },
  { icon: Sparkles, label: "Sanitized" },
  { icon: ShieldCheck, label: "Warranty Support" },
  { icon: Truck, label: "Delivery Available" },
  { icon: CircleDollarSign, label: "Affordable Pricing" },
];

export default function TrustBadges() {
  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
        >
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                variants={fadeUp}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl",
                  "border border-white/12 bg-white/[0.06]",
                  "px-4 py-3",
                )}
              >
                <Icon className="h-4 w-4 text-white" />
                <span className="text-[12px] font-medium tracking-wide text-white">
                  {b.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

