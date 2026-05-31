"use client";

import { useMemo, useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import {
  ACCEPTED_BRANDS,
  AGE_OPTIONS,
  APPLIANCE_CATEGORIES,
  CONDITION_OPTIONS,
  WORKING_STATUS_OPTIONS,
  estimateTradeInValue,
  formatInrRange,
  tradeInGlass,
  tradeInSection,
  type AgeOption,
  type ApplianceTypeId,
  type ConditionOption,
  type WorkingStatusOption,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

const fieldClass =
  "trade-in-field w-full min-h-[48px] rounded-xl border border-theme-border bg-theme-input-bg px-4 py-3 text-[14px] text-theme-fg outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/15";

export default function TradeInEstimator() {
  const [applianceType, setApplianceType] = useState<ApplianceTypeId>("refrigerator");
  const [brand, setBrand] = useState<string>(ACCEPTED_BRANDS[0]);
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
    <section id="estimator" className={cn("py-8 sm:py-10", tradeInSection)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-[20px] font-semibold text-theme-fg sm:text-[22px]">
          Trade-In Estimator
        </h2>
        <p className="mt-1 text-[14px] text-theme-fg-muted">
          Select your appliance details for an instant indicative range.
        </p>

        <div className={cn("mt-5 p-4 sm:p-6", tradeInGlass)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                Appliance Type
              </span>
              <select
                value={applianceType}
                onChange={(e) => setApplianceType(e.target.value as ApplianceTypeId)}
                className={fieldClass}
              >
                {APPLIANCE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">Brand</span>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className={fieldClass}>
                {ACCEPTED_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">Age</span>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value as AgeOption)}
                className={fieldClass}
              >
                {AGE_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                Condition
              </span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionOption)}
                className={fieldClass}
              >
                {CONDITION_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                Working Status
              </span>
              <select
                value={workingStatus}
                onChange={(e) => setWorkingStatus(e.target.value as WorkingStatusOption)}
                className={fieldClass}
              >
                {WORKING_STATUS_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-xl border border-theme-border bg-theme-input-bg px-4 py-4">
            <p className="text-[12px] font-medium text-theme-fg-muted">Estimated Trade-In Range</p>
            <p className="mt-1 text-[26px] font-bold tracking-tight text-theme-fg sm:text-[30px]">
              {estimate ? formatInrRange(estimate.low, estimate.high) : "—"}
            </p>
            <p className="mt-1 text-[12px] text-theme-fg-faint">
              Final value confirmed after verification.
            </p>
          </div>

          <CtaButton href="#sell-form" className="mt-4" fullWidth>
            Continue to Sell Form
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
