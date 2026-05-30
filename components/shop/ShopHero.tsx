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
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-10">
        <div>
          <p className="shop-hero-eyebrow text-[12px] font-medium tracking-[0.18em] text-white/55">
            SHOP
          </p>
          <h1 className="shop-hero-title type-page-hero mt-2 text-[28px] font-semibold tracking-tight text-white sm:text-[36px]">
            Premium Renewed Appliances
          </h1>
          <p className="shop-hero-desc mt-2 max-w-xl text-[15px] leading-7 text-white/65">
            Professionally restored, tested, sanitized and warranty protected.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
