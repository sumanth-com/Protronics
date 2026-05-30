"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileLiteMotion } from "@/hooks/useMobileLiteMotion";
import { Calculator } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import {
  ACCEPTED_BRANDS,
  AGE_OPTIONS,
  APPLIANCE_CATEGORIES,
  CONDITION_OPTIONS,
  WORKING_STATUS_OPTIONS,
  estimateTradeInValue,
  formatInrRange,
  tradeInGlass,
  type AgeOption,
  type ApplianceTypeId,
  type ConditionOption,
  type WorkingStatusOption,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

const fieldClass =
  "trade-in-field w-full min-h-[48px] rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none transition-[border-color,box-shadow] focus:border-white/40 focus:ring-2 focus:ring-white/15";

export default function TradeInEstimator() {
  const lite = useMobileLiteMotion();
  const [applianceType, setApplianceType] = useState<ApplianceTypeId>("refrigerator");
  const [brand, setBrand] = useState<string>(ACCEPTED_BRANDS[0]);
  const [model, setModel] = useState("");
  const [age, setAge] = useState<AgeOption>(AGE_OPTIONS[1]);
  const [condition, setCondition] = useState<ConditionOption>("Good");
  const [workingStatus, setWorkingStatus] = useState<WorkingStatusOption>(
    WORKING_STATUS_OPTIONS[0],
  );

  const estimate = useMemo(
    () =>
      estimateTradeInValue({
        applianceType,
        brand,
        age,
        condition,
        workingStatus,
      }),
    [applianceType, brand, age, condition, workingStatus],
  );

  return (
    <section id="estimator" className="relative bg-black py-14 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="TRADE-IN VALUE ESTIMATOR"
            title="Estimated Trade-In Range"
            description="Get an instant indicative value in seconds. Final offer is confirmed after doorstep inspection."
            align="center"
          />
        </TradeInReveal>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
          <TradeInReveal className={cn("p-5 sm:p-8", tradeInGlass)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Appliance Type
                </span>
                <select
                  value={applianceType}
                  onChange={(e) => setApplianceType(e.target.value as ApplianceTypeId)}
                  className={fieldClass}
                >
                  {APPLIANCE_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-black">
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Brand
                </span>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={fieldClass}
                >
                  {ACCEPTED_BRANDS.map((b) => (
                    <option key={b} value={b} className="bg-black">
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Model (optional)
                </span>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={fieldClass}
                  placeholder="e.g. GL-D322ABNX"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Age
                </span>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value as AgeOption)}
                  className={fieldClass}
                >
                  {AGE_OPTIONS.map((a) => (
                    <option key={a} value={a} className="bg-black">
                      {a}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Condition
                </span>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ConditionOption)}
                  className={fieldClass}
                >
                  {CONDITION_OPTIONS.map((c) => (
                    <option key={c} value={c} className="bg-black">
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[12px] font-medium text-white/55">
                  Working Status
                </span>
                <select
                  value={workingStatus}
                  onChange={(e) =>
                    setWorkingStatus(e.target.value as WorkingStatusOption)
                  }
                  className={fieldClass}
                >
                  {WORKING_STATUS_OPTIONS.map((w) => (
                    <option key={w} value={w} className="bg-black">
                      {w}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </TradeInReveal>

          <TradeInReveal delay={0.08}>
            <div
              className={cn(
                "flex h-full flex-col justify-center p-5 sm:p-8",
                tradeInGlass,
              )}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/[0.06]">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <p className="text-[12px] font-medium tracking-[0.18em] text-white/50">
                  ESTIMATED TRADE-IN RANGE
                </p>
              </div>

              <div className="trade-in-estimator-result mt-6 min-h-[108px] sm:min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={estimate ? `${estimate.low}-${estimate.high}` : "empty"}
                  initial={lite ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={lite ? undefined : { opacity: 0 }}
                  transition={{ duration: lite ? 0 : 0.2 }}
                >
                  {estimate ? (
                    <>
                      <p className="text-[28px] font-semibold tracking-tight text-white sm:text-[36px]">
                        {formatInrRange(estimate.low, estimate.high)}
                      </p>
                      <p className="mt-3 text-[13px] leading-6 text-white/55">
                        Indicative range only. We&apos;ll contact you with a detailed
                        valuation after review
                        {model ? ` of your ${model}` : ""}.
                      </p>
                    </>
                  ) : (
                    <p className="text-[15px] text-white/60">
                      Select appliance details to see your estimated range.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
              </div>

              <CtaButton href="#trade-in-form" className="mt-8" fullWidth>
                Get Trade-In Estimate
              </CtaButton>
            </div>
          </TradeInReveal>
        </div>
      </div>
    </section>
  );
}
