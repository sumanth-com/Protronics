"use client";

import { Check, X } from "lucide-react";
import type { InspectionResult, ProductHighlight } from "@/lib/product-detail";
import { IDEAL_FOR_CARDS } from "@/lib/product-detail";
import { cn } from "@/lib/utils";

export function ProductInspectionReport({
  inspection,
}: {
  inspection: InspectionResult[];
}) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-black p-6 sm:p-8 supports-[backdrop-filter]:backdrop-blur-xl">
      <p className="text-[12px] font-medium tracking-[0.2em] text-white/55">
        INSPECTION REPORT
      </p>
      <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[26px]">
        Premium Condition Report
      </h2>
      <p className="mt-2 max-w-xl text-[14px] leading-6 text-white/55">
        Every unit passes our 100+ point checklist. Here&apos;s how this appliance performed.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {inspection.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3.5",
              item.passed
                ? "border-white/20 bg-white/[0.04]"
                : "border-white/10 bg-white/[0.03]",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full",
                  item.passed ? "bg-white/10 text-white" : "bg-white/10 text-white/50",
                )}
              >
                {item.passed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </span>
              <span className="text-[14px] font-medium text-white">{item.label}</span>
            </div>
            <span className="text-[13px] text-white/55">{item.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductHighlights({
  highlights,
  idealFor,
}: {
  highlights: ProductHighlight[];
  idealFor: string[];
}) {
  const idealCards = IDEAL_FOR_CARDS.filter((c) => idealFor.includes(c.title));

  return (
    <section className="space-y-10">
      <div>
        <p className="text-[12px] font-medium tracking-[0.2em] text-white/55">HIGHLIGHTS</p>
        <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[26px]">
          Why choose this appliance?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-white/[0.08] bg-black p-5 supports-[backdrop-filter]:backdrop-blur-xl"
            >
              <h3 className="text-[16px] font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-white/55">{h.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[18px] font-semibold text-white">Perfect for</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(idealCards.length > 0 ? idealCards : IDEAL_FOR_CARDS).map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-5"
            >
              <h4 className="text-[15px] font-semibold text-white">{card.title}</h4>
              <p className="mt-2 text-[13px] leading-5 text-white/55">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductWarrantyDelivery({
  warranty,
  coverage,
  deliveryTimeline,
  installationSupport,
}: {
  warranty: string;
  coverage: string[];
  deliveryTimeline: string;
  installationSupport: string;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-black p-6 sm:p-8 supports-[backdrop-filter]:backdrop-blur-xl">
      <p className="text-[12px] font-medium tracking-[0.2em] text-white/55">
        WARRANTY & DELIVERY
      </p>
      <h2 className="mt-2 text-[22px] font-semibold text-white">Peace of mind included</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-wide text-white/45">Warranty</p>
          <p className="mt-1 text-[16px] font-semibold text-white">{warranty}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-wide text-white/45">Delivery</p>
          <p className="mt-1 text-[14px] font-medium leading-snug text-white">{deliveryTimeline}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
          <p className="text-[11px] uppercase tracking-wide text-white/45">Installation</p>
          <p className="mt-1 text-[14px] font-medium leading-snug text-white">
            {installationSupport}
          </p>
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {coverage.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
