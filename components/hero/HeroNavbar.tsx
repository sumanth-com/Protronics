"use client";

import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* full-width glass bar (no “card” container) */}
      <div
        className={cn(
          "relative w-full",
          "border-b border-white/10",
          // pure black (no glass / blur)
          "bg-black",
        )}
      >
        {/* subtle top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0))]" />

        <div className="relative mx-auto flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6">

          {/* Brand */}
          <div className="relative flex min-w-[150px] items-center">
            <div className="leading-none">
              <div className="text-[15px] font-semibold tracking-tight text-[#39ff88]">
                Protronics
              </div>
              <div className="mt-1 hidden text-[11px] text-white/55 lg:block">
                Premium. Refurbished. Perfected.
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative hidden flex-1 items-center md:flex">
            <div
              className={cn(
                "relative mx-auto flex w-full max-w-[420px] items-center",
                "rounded-full border border-white/10 bg-white/[0.03]",
                // slimmer search bar like reference
                "px-4 py-2",
              )}
            >
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(520px_120px_at_30%_20%,rgba(57,255,136,0.10),transparent_60%)]" />
              <Search className="h-4 w-4 text-white/55" />
              <input
                placeholder="Search premium appliances…"
                className={cn(
                  "ml-3 w-full bg-transparent text-[13px] text-white/80",
                  "placeholder:text-white/35",
                  "outline-none",
                )}
              />
              <div className="ml-2 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                <SlidersHorizontal className="h-4 w-4 text-white/55" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="relative hidden items-center gap-4 lg:flex">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[12px] font-medium tracking-wide text-white/65 transition-colors hover:text-white"
            >
              Categories <ChevronDown className="h-4 w-4 text-white/45" />
            </a>
            {["Why Protronics", "Support", "About Us", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[12px] font-medium tracking-wide text-white/65 transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="relative flex items-center gap-3">
            <a href="https://wa.me/" className="hidden sm:block">
              <motion.button
                whileHover={{ y: -1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "rounded-full px-3.5 py-2",
                  "border border-[#39ff88]/20 bg-[#39ff88]/10 text-[#a9ffcd]",
                  "text-[12px] font-medium tracking-wide",
                  "inline-flex items-center gap-2",
                )}
              >
                <MessageCircle className="h-4 w-4 text-[#39ff88]/85" />
                WhatsApp Inquiry
              </motion.button>
            </a>

            <a href="#shop">
              <MagneticButton
                className={cn(
                  "rounded-full px-3.5 py-2",
                  // reference-like premium green pill
                  "bg-[#39ff88] text-black",
                  "ring-1 ring-white/10",
                  "shadow-[0_18px_50px_rgba(57,255,136,0.18),0_30px_110px_rgba(0,0,0,0.65)]",
                  "text-[12px] font-semibold tracking-wide",
                  "inline-flex items-center gap-2",
                )}
              >
                <ShoppingBag className="h-4 w-4 text-black/80" />
                Shop Now
              </MagneticButton>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

