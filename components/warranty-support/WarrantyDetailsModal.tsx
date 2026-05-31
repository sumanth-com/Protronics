"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useEffect, type WheelEvent } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { useLenis } from "@/hooks/useLenis";
import { BUSINESS } from "@/lib/contact";
import {
  WARRANTY_CLAIM_STEPS,
  WARRANTY_COVERED,
  WARRANTY_NOT_COVERED,
  WARRANTY_SUMMARY,
} from "@/lib/warranty-details";
import { cn } from "@/lib/utils";

type WarrantyDetailsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WarrantyDetailsModal({
  open,
  onClose,
}: WarrantyDetailsModalProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    lenis?.stop();
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  const blockBackdropScroll = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/65 backdrop-blur-sm"
            onClick={onClose}
            onWheel={blockBackdropScroll}
            data-lenis-prevent
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "warranty-details-modal fixed left-1/2 top-1/2 z-[121] flex max-h-[min(calc(100dvh-2rem),720px)] w-[min(100%-1.5rem,520px)] -translate-x-1/2 -translate-y-1/2 flex-col",
              "overflow-hidden rounded-3xl border border-white/12 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.75)]",
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="warranty-details-title"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.06]">
                  <ShieldCheck className="h-5 w-5 text-theme-accent" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] text-white/50">
                    WARRANTY COVERAGE
                  </p>
                  <h2
                    id="warranty-details-title"
                    className="mt-0.5 text-[18px] font-semibold leading-snug text-white sm:text-[20px]"
                  >
                    {WARRANTY_SUMMARY.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close warranty details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="warranty-details-modal-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6"
              data-lenis-prevent
            >
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[14px] leading-7 text-white/78">
                {WARRANTY_SUMMARY.duration}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <section>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    What&apos;s covered
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {WARRANTY_COVERED.map((item) => (
                      <li key={item} className="flex gap-2 text-[13px] leading-6 text-white/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Not covered
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {WARRANTY_NOT_COVERED.map((item) => (
                      <li key={item} className="flex gap-2 text-[13px] leading-6 text-white/65">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-5">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  How to claim
                </h3>
                <ol className="mt-2.5 space-y-2.5">
                  {WARRANTY_CLAIM_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-3 text-[13px] leading-6 text-white/75">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-semibold text-white/80">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <p className="mt-5 text-[12px] leading-6 text-white/50">{WARRANTY_SUMMARY.note}</p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:px-6">
              <a
                href={BUSINESS.whatsappMessage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-theme-border bg-white px-4 py-2.5 text-[13px] font-semibold text-theme-fg transition-opacity hover:opacity-90 active:opacity-80"
              >
                WhatsApp support
              </a>
              <CtaButton href="/support/warranty" className="flex-1" size="sm" onClick={onClose}>
                Full help center
              </CtaButton>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
