"use client";

import { ArrowUpRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
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
        <CtaButton type="submit" fullWidth className="sm:w-auto">
          Subscribe
          <ArrowUpRight className="h-4 w-4 text-black/80" />
        </CtaButton>
      </form>
    </div>
  );
}

