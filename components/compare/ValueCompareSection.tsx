"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

type CompareRow = {
  label: string;
  newValue: string;
  protronicsValue: string;
  winner: "new" | "protronics" | "tie";
};

const ROWS: CompareRow[] = [
  {
    label: "Price",
    newValue: "Full retail pricing",
    protronicsValue: "Up to 40% savings",
    winner: "protronics",
  },
  {
    label: "Warranty",
    newValue: "1–2 years manufacturer",
    protronicsValue: "1 year + human support",
    winner: "tie",
  },
  {
    label: "Quality Checks",
    newValue: "Factory QC only",
    protronicsValue: "100+ point inspection",
    winner: "protronics",
  },
  {
    label: "Delivery",
    newValue: "Standard drop-off",
    protronicsValue: "White-glove setup",
    winner: "protronics",
  },
  {
    label: "Performance",
    newValue: "Untested post-use",
    protronicsValue: "Certified & sanitized",
    winner: "protronics",
  },
];

function WinnerIcon({ winner }: { winner: CompareRow["winner"] }) {
  if (winner === "protronics") {
    return <Check className="h-4 w-4 text-emerald-400" aria-hidden />;
  }
  if (winner === "new") {
    return <X className="h-4 w-4 text-white/30" aria-hidden />;
  }
  return <Minus className="h-4 w-4 text-white/40" aria-hidden />;
}

export default function ValueCompareSection() {
  return (
    <section id="compare-value" className="theme-section-b relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            Compare
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "mt-3 font-semibold tracking-tight text-white",
              "type-section-title text-[34px] leading-[1.06] sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            New vs Protronics Refurbished
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            Premium quality without premium pricing. See why smart buyers choose
            professionally renewed.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
          className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/[0.08] bg-white/[0.03] text-[12px] font-medium tracking-wide">
            <div className="px-4 py-4 text-white/50 sm:px-6">Feature</div>
            <div className="px-4 py-4 text-center text-white/50 sm:px-6">
              Brand New
            </div>
            <div className="px-4 py-4 text-center text-white sm:px-6">
              Protronics
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-[1.2fr_1fr_1fr] text-[13px]",
                i < ROWS.length - 1 && "border-b border-white/[0.06]",
              )}
            >
              <div className="flex items-center px-4 py-4 font-medium text-white/80 sm:px-6">
                {row.label}
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-4 text-center text-white/45 sm:px-6">
                <WinnerIcon winner={row.winner === "new" ? "new" : "tie"} />
                <span className="hidden sm:inline">{row.newValue}</span>
                <span className="sm:hidden">{row.newValue.split(" ")[0]}</span>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-4 text-center sm:px-6",
                  row.winner === "protronics"
                    ? "bg-emerald-500/[0.06] font-medium text-white"
                    : "text-white/70",
                )}
              >
                <WinnerIcon winner={row.winner} />
                <span className="hidden sm:inline">{row.protronicsValue}</span>
                <span className="sm:hidden">
                  {row.protronicsValue.split(" ")[0]}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <CtaButton href="/shop">Shop renewed appliances</CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
