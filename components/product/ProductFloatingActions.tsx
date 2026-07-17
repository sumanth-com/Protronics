"use client";

import { ChevronLeft, X } from "lucide-react";
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
      {/*
        Reserve tab: fixed top with svh (stable while mobile chrome shows/hides).
        Avoid inset-y-0 + flex centering — that reflows mid-scroll and feels like a glitch.
      */}
      <div className="product-reserve-side pointer-events-none fixed right-0 z-[88]">
        {tabOpen ? (
          <div className="product-reserve-side-panel pointer-events-auto overflow-hidden rounded-l-2xl shadow-theme ring-1 ring-theme-accent/20">
            <div className="flex flex-col items-center bg-theme-accent text-theme-accent-fg">
              <button
                type="button"
                onClick={collapseTab}
                aria-label="Close reserve tab"
                className={cn(
                  "flex w-full items-center justify-center py-2.5",
                  "border-b border-theme-accent-fg/15",
                  "touch-manipulation transition-colors hover:bg-theme-accent-fg/10 active:bg-theme-accent-fg/15",
                )}
              >
                <X className="h-4 w-4" aria-hidden strokeWidth={2.5} />
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
          </div>
        ) : (
          <button
            type="button"
            onClick={expandTab}
            aria-label="Show reserve tab"
            className={cn(
              "product-reserve-side-toggle pointer-events-auto",
              "grid h-11 w-9 place-items-center rounded-l-xl",
              "bg-theme-accent text-theme-accent-fg shadow-theme ring-1 ring-theme-accent/20",
              "touch-manipulation transition-colors duration-150",
              "hover:bg-theme-accent-hover active:opacity-90",
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        )}
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp inquiry for ${product.name}`}
        className={cn(
          "product-whatsapp-fab fixed z-[89] grid place-items-center",
          "h-14 w-14 rounded-full",
          "bg-theme-accent text-theme-accent-fg",
          "shadow-[0_8px_28px_color-mix(in_srgb,var(--theme-accent)_42%,transparent)]",
          "touch-manipulation",
          "right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]",
          "lg:right-8 lg:bottom-8",
        )}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
