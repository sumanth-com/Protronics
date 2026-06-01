"use client";

import { CircleDollarSign, ClipboardCheck, IndianRupee, Truck } from "lucide-react";
import TradeInApplianceIcon from "@/components/trade-in/TradeInApplianceIcon";
import { tradeInSection } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

const HERO_PILLS = [
  { icon: ClipboardCheck, label: "Free evaluation" },
  { icon: CircleDollarSign, label: "Fair market price" },
  { icon: Truck, label: "Pickup assistance" },
] as const;

function TradeInHeroShowcase({ className }: { className?: string }) {
  return (
    <div
      className={cn("trade-in-hero-showcase relative mx-auto w-full max-w-[340px] lg:max-w-none", className)}
      aria-hidden
    >
      <div className="trade-in-hero-showcase-card relative overflow-hidden rounded-2xl border border-theme-border bg-theme-surface-card shadow-theme-sm">
        <div className="trade-in-hero-showcase-glow pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-fg-faint">
            Selling made simple
          </p>

          <div className="mx-auto mt-4 flex justify-center">
            <TradeInApplianceIcon
              variant="hero"
              boxClass="h-[7.5rem] w-[7.5rem] sm:h-32 sm:w-32 lg:h-36 lg:w-36"
              iconClass="h-[4.5rem] w-auto sm:h-[5.25rem] lg:h-24"
            />
          </div>

          <p className="trade-in-hero-showcase-value mx-auto mt-4 flex items-center justify-center gap-1.5 text-[15px] font-semibold tracking-tight text-theme-fg sm:text-[16px]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-theme-accent text-theme-accent-fg">
              <IndianRupee className="h-4 w-4" strokeWidth={2.5} />
            </span>
            Instant fair value
          </p>
        </div>

        <ul className="trade-in-hero-showcase-pills relative flex list-none flex-wrap justify-center gap-2 border-t border-theme-border bg-theme-input-bg/60 px-4 py-3.5">
          {HERO_PILLS.map(({ icon: Icon, label }) => (
            <li key={label}>
              <span className="trade-in-hero-showcase-pill inline-flex items-center gap-1.5 rounded-full border border-theme-border bg-theme-surface-card px-2.5 py-1.5 text-[11px] font-medium text-theme-fg-secondary shadow-theme-sm sm:text-[12px]">
                <Icon className="h-3.5 w-3.5 shrink-0 text-theme-accent" strokeWidth={2} />
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TradeInHero() {
  return (
    <section
      className={cn(
        "trade-in-hero trade-in-hero-fullscreen border-b border-theme-border",
        tradeInSection,
      )}
    >
      <div className="trade-in-hero-inner mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="trade-in-hero-column flex min-h-0 flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <div className="w-full max-w-[22rem] shrink-0 sm:max-w-md lg:max-w-xl">
              <h1
                id="trade-in-hero-heading"
                className="text-[26px] font-semibold leading-[1.12] tracking-tight text-theme-fg sm:text-[32px] lg:text-[44px] xl:text-[52px]"
              >
                Sell Your Appliance. Get Instant Value.
              </h1>

              <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-theme-fg-muted sm:mt-3 sm:text-[15px] lg:mx-0 lg:mt-4 lg:max-w-lg lg:text-[17px] lg:leading-relaxed">
                Free valuation, fair pricing, and easy upgrade to premium refurbished appliances.
              </p>
            </div>

            <TradeInHeroShowcase className="mt-6 w-full shrink-0 lg:hidden" />
          </div>

          <div className="hidden min-h-0 lg:flex lg:items-center lg:justify-center lg:pr-2 xl:pr-6">
            <TradeInHeroShowcase className="w-full max-w-[420px] xl:max-w-[460px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
