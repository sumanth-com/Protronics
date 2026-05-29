"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import AboutAmbient from "@/components/about/AboutAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { COMPARISON_COLUMNS, COMPARISON_ROWS, whyGlass } from "@/lib/why";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

function CellIcon({ value, highlight }: { value: boolean; highlight?: boolean }) {
  if (value) {
    return (
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full",
          highlight ? "bg-[#39ff88]/15" : "bg-white/[0.06]",
        )}
      >
        <Check className={cn("h-4 w-4", highlight ? "text-[#39ff88]" : "text-white/70")} strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03]">
      <X className="h-4 w-4 text-white/25" strokeWidth={2} />
    </span>
  );
}

const competitorKeys = [
  "localDealers",
  "olx",
  "facebook",
  "randomSellers",
] as const;

export default function WhyComparison() {
  return (
    <section aria-labelledby="why-comparison-heading" className="relative overflow-hidden bg-black py-16 sm:py-20">
      <AboutAmbient />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="why-comparison-heading"
          eyebrow="PROTRONICS VS OTHERS"
          title="The Safer Way to Buy Refurbished."
          description="Paying slightly more for Protronics means verified quality—not guesswork from unknown sellers."
          align="center"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className={cn("mt-10 overflow-hidden", whyGlass)}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-4 text-[13px] font-medium text-white/45 sm:px-6">Feature</th>
                  {COMPARISON_COLUMNS.map((col) => (
                    <th
                      key={col.id}
                      className={cn(
                        "px-3 py-4 text-center text-[12px] font-semibold sm:px-4 sm:text-[13px]",
                        col.highlight
                          ? "bg-[#39ff88]/[0.08] text-[#39ff88]"
                          : "text-white/55",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-white/[0.06]",
                      idx === COMPARISON_ROWS.length - 1 && "border-b-0",
                    )}
                  >
                    <td className="px-4 py-4 text-[14px] font-medium text-white/90 sm:px-6 sm:text-[15px]">
                      {row.label}
                    </td>
                    <td className="bg-[#39ff88]/[0.04] px-3 py-4 text-center sm:px-4">
                      <CellIcon value={row.protronics} highlight />
                    </td>
                    {competitorKeys.map((key) => (
                      <td key={key} className="px-3 py-4 text-center sm:px-4">
                        <CellIcon value={row[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-2xl text-center text-[14px] leading-7 text-white/55"
        >
          Every checkmark is backed by our process—not a seller&apos;s promise.
        </motion.p>
      </div>
    </section>
  );
}
