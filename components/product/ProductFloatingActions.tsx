"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { getWhatsAppInquiryLink, type ProductDetail } from "@/lib/product-detail";
import { cn } from "@/lib/utils";

type ProductFloatingActionsProps = {
  product: ProductDetail;
  onReserve: () => void;
};

const RESERVE_TAB_STORAGE_KEY = "protronics-reserve-tab-open";
const RESERVE_TAB_EVENT = "protronics-reserve-tab";

function subscribeTabOpen(onStoreChange: () => void) {
  window.addEventListener(RESERVE_TAB_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(RESERVE_TAB_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getTabOpenSnapshot() {
  try {
    return sessionStorage.getItem(RESERVE_TAB_STORAGE_KEY) !== "0";
  } catch {
    return true;
  }
}

function getTabOpenServerSnapshot() {
  return true;
}

function setTabOpenStored(open: boolean) {
  try {
    sessionStorage.setItem(RESERVE_TAB_STORAGE_KEY, open ? "1" : "0");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(RESERVE_TAB_EVENT));
}

export default function ProductFloatingActions({
  product,
  onReserve,
}: ProductFloatingActionsProps) {
  const whatsappHref = getWhatsAppInquiryLink(product);
  const tabOpen = useSyncExternalStore(
    subscribeTabOpen,
    getTabOpenSnapshot,
    getTabOpenServerSnapshot,
  );

  const collapseTab = useCallback(() => setTabOpenStored(false), []);
  const expandTab = useCallback(() => setTabOpenStored(true), []);

  return (
    <>
      {/* Reserve — collapsible side tab */}
      <div
        className={cn(
          "product-reserve-side fixed right-0 top-1/2 z-[88] -translate-y-1/2",
          "pointer-events-none",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {tabOpen ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="product-reserve-side-panel pointer-events-auto overflow-hidden rounded-l-2xl shadow-theme ring-1 ring-theme-accent/20"
            >
              <div className="flex flex-col items-center bg-theme-accent text-theme-accent-fg">
                <button
                  type="button"
                  onClick={collapseTab}
                  aria-label="Hide reserve tab"
                  className={cn(
                    "flex w-full items-center justify-center py-2",
                    "border-b border-theme-accent-fg/15",
                    "touch-manipulation transition-colors hover:bg-theme-accent-fg/10 active:bg-theme-accent-fg/15",
                  )}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </button>

                <button
                  type="button"
                  onClick={onReserve}
                  aria-label="Reserve this appliance"
                  className={cn(
                    "product-reserve-side-body flex flex-col items-center gap-2 px-2.5 py-3",
                    "touch-manipulation transition-colors hover:bg-theme-accent-hover active:opacity-95",
                  )}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    Reserve
                  </span>
                  <span className="product-reserve-side-tap grid h-6 w-6 place-items-center rounded-full bg-theme-accent-fg/15 text-[8px] font-bold uppercase tracking-wide">
                    Tap
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              type="button"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={expandTab}
              aria-label="Show reserve tab"
              className={cn(
                "product-reserve-side-toggle pointer-events-auto",
                "grid h-11 w-11 place-items-center rounded-l-xl",
                "bg-theme-accent text-theme-accent-fg shadow-theme ring-1 ring-theme-accent/20",
                "touch-manipulation transition-[background-color,transform] duration-150",
                "hover:bg-theme-accent-hover active:scale-95",
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* WhatsApp — fixed bottom-right, clear of mobile nav */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp inquiry for ${product.name}`}
        className={cn(
          "product-whatsapp-fab fixed z-[89] grid place-items-center",
          "h-14 w-14 rounded-full",
          "bg-theme-accent text-theme-accent-fg",
          "shadow-[0_6px_24px_color-mix(in_srgb,var(--theme-accent)_50%,transparent)]",
          "ring-2 ring-white/95 dark:ring-white/15",
          "transition-[transform,background-color,box-shadow] duration-200",
          "hover:bg-theme-accent-hover hover:scale-[1.05] active:scale-[0.96]",
          "touch-manipulation",
          /* Mobile: sit just above bottom nav — low, visible, clean */
          "right-4 bottom-[calc(var(--mobile-bottom-nav-height)+0.5rem+env(safe-area-inset-bottom,0px))]",
          /* Desktop: classic bottom-right corner */
          "lg:right-8 lg:bottom-8",
        )}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
