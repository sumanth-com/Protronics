"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQ = {
  question: string;
  answer: string;
};

export type FAQItemProps = {
  item: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

export default function FAQItem({
  item,
  isOpen,
  onToggle,
  className,
}: FAQItemProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/12 bg-white/[0.05]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "relative flex w-full items-center justify-between gap-4",
          "px-6 py-5 text-left",
        )}
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <div className="text-[14px] font-semibold leading-snug tracking-tight text-white sm:text-[15px]">
            {item.question}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full",
            "border border-white/12 bg-white/[0.06]",
          )}
        >
          <ChevronDown className="h-4 w-4 text-white/80" />
        </motion.div>

        {/* subtle hover sheen */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(700px_260px_at_15%_0%,rgba(255,90,85,0.18),transparent_58%),radial-gradient(520px_240px_at_85%_20%,rgba(255,255,255,0.07),transparent_55%)]" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px w-full bg-white/10" />
              <div className="mt-4 text-[13px] leading-7 text-white/70">
                {item.answer}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

