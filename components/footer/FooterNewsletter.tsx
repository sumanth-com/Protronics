"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FooterNewsletterProps = {
  className?: string;
};

export default function FooterNewsletter({ className }: FooterNewsletterProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/12 bg-white/[0.05]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_40px_140px_rgba(0,0,0,0.70)]",
        "px-6 py-6 sm:px-7 sm:py-7",
        className,
      )}
    >
      <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
        NEWSLETTER
      </div>
      <div className="mt-3 text-[18px] font-semibold tracking-tight text-white">
        Stay Updated with Premium Deals
      </div>
      <div className="mt-2 text-[13px] leading-7 text-white/70">
        Curated drops, best‑seller restocks, and premium offers—only when it’s
        worth your attention.
      </div>

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Your email (premium updates only)"
          className={cn(
            "w-full rounded-full px-5 py-3",
            "border border-white/12 bg-white/[0.06] text-white",
            "placeholder:text-white/40",
            "outline-none focus:border-[#ff5a55]/35 focus:ring-2 focus:ring-[#ff5a55]/15",
          )}
        />
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          type="submit"
          className={cn(
            "inline-flex items-center justify-center rounded-full px-6 py-3",
            "bg-white text-black",
            "text-[12px] font-medium tracking-wide",
            "shadow-[0_22px_70px_rgba(0,0,0,0.65)]",
            "ring-1 ring-white/10",
            "w-full sm:w-auto",
          )}
        >
          Subscribe
          <ArrowUpRight className="ml-2 h-4 w-4 opacity-85" />
        </motion.button>
      </form>
    </div>
  );
}

