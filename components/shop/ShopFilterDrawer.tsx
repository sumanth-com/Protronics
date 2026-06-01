"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ShopFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ShopFilterDrawer({ open, onClose, children }: ShopFilterDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "shop-filter-drawer fixed inset-y-0 left-0 z-[110] flex w-[min(320px,88vw)] flex-col",
              "border-r border-theme-border bg-theme-surface lg:hidden",
            )}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-theme-border px-5 py-4">
              <div className="flex items-center gap-2 text-theme-fg">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-[15px] font-semibold">Filters</span>
              </div>
              <button type="button" onClick={onClose} aria-label="Close filters">
                <X className="h-5 w-5 text-theme-fg-muted" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {children}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
