"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ShopHeroProps = {
  productCount: number;
  categoryCount: number;
};

export default function ShopHero({ productCount, categoryCount }: ShopHeroProps) {
  return (
    <section className="shop-hero relative border-b border-white/[0.06] bg-black">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="shop-hero-eyebrow text-[12px] font-medium tracking-[0.18em] text-white/55">
            SHOP
          </p>
          <h1 className="shop-hero-title type-page-hero mt-2 text-[28px] font-semibold tracking-tight text-white sm:text-[36px]">
            Premium Renewed Appliances
          </h1>
          <div className="theme-accent-line mx-auto mt-3 w-12 lg:mx-0" />
          <p className="shop-hero-desc mx-auto mt-3 max-w-md text-[15px] leading-7 text-white/65 lg:mx-0 lg:mt-2 lg:max-w-xl">
            Professionally restored, tested, sanitized and warranty protected.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
          <div className="shop-stat-card rounded-xl px-4 py-2.5 border border-white/[0.08] bg-black">
            <p className="shop-stat-value text-[18px] font-semibold text-white">{productCount}</p>
            <p className="shop-stat-label text-[11px] text-white/45">Products</p>
          </div>
          <div className="shop-stat-card rounded-xl px-4 py-2.5 border border-white/[0.08] bg-black">
            <p className="shop-stat-value text-[18px] font-semibold text-white">{categoryCount}</p>
            <p className="shop-stat-label text-[11px] text-white/45">Categories</p>
          </div>
          <div
            className={cn(
              "shop-stat-card shop-stat-card-accent inline-flex items-center gap-2 rounded-xl px-4 py-2.5",
              "border border-white/25 bg-white/[0.06]",
            )}
          >
            <ShieldCheck className="shop-stat-icon h-4 w-4 text-white" />
            <span className="shop-stat-accent-text text-[12px] font-medium text-white">
              100+ Point Tested
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

type ShopFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function ShopFilterDrawer({ open, onClose, children }: ShopFilterDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "shop-filter-drawer fixed inset-y-0 left-0 z-50 w-[min(320px,88vw)] overflow-y-auto",
              "border-r border-white/[0.08] bg-black p-5 lg:hidden",
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="shop-drawer-title flex items-center gap-2 text-white">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-[15px] font-semibold">Filters</span>
              </div>
              <button type="button" onClick={onClose} aria-label="Close filters">
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            {children}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
