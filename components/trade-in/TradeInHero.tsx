"use client";

import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  HandCoins,
  IndianRupee,
  Refrigerator,
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import { TRADE_IN_LINKS, tradeInSection } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

const mobileCta =
  "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-theme-border bg-theme-surface-card px-4 py-3 text-[13px] font-semibold text-theme-fg touch-manipulation active:opacity-90";

const FALLING_COIN_COUNT = 7;

function InstantValueAnimatedIcon({ boxClass, iconClass }: { boxClass: string; iconClass: string }) {
  return (
    <div
      className={cn(
        "trade-in-coins-stage relative overflow-hidden rounded-xl border border-theme-accent/35 bg-theme-accent/10",
        boxClass,
      )}
    >
      <div className="trade-in-coins-rain pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: FALLING_COIN_COUNT }).map((_, i) => (
          <span
            key={i}
            className="trade-in-falling-coin"
            style={{
              left: `${22 + ((i * 11) % 56)}%`,
              animationDelay: `${i * 0.28}s`,
              animationDuration: `${1.35 + (i % 4) * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-[1] grid h-full w-full place-items-center text-theme-accent">
        <HandCoins className={iconClass} strokeWidth={1.75} />
      </div>
    </div>
  );
}

function TradeInHeroVisual({
  className,
  layout = "vertical",
}: {
  className?: string;
  layout?: "vertical" | "horizontal";
}) {
  if (layout === "horizontal") {
    return (
      <div
        className={cn("trade-in-hero-visual relative mx-auto w-full max-w-[360px]", className)}
        aria-hidden
      >
        <div className="relative overflow-hidden rounded-2xl border border-theme-border bg-theme-surface-card p-5 shadow-theme-sm">
          <span className="absolute right-3 top-3 rounded-full bg-theme-accent px-2.5 py-0.5 text-[10px] font-semibold text-theme-accent-fg">
            Free estimate
          </span>
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col items-center gap-1.5">
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-theme-border bg-theme-input-bg text-theme-fg-muted">
                <Refrigerator className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-medium text-theme-fg-faint">Your appliance</span>
            </div>
            <ArrowDown className="h-5 w-5 shrink-0 text-theme-accent" strokeWidth={2.25} />
            <div className="flex flex-col items-center gap-1.5">
              <InstantValueAnimatedIcon boxClass="h-14 w-14" iconClass="h-7 w-7" />
              <span className="text-[10px] font-semibold text-theme-accent">Instant value</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "trade-in-hero-visual trade-in-hero-visual--vertical relative flex w-full flex-col",
        className,
      )}
      aria-hidden
    >
      <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-theme-border bg-theme-surface-card shadow-theme-sm">
        <span className="absolute right-3 top-3 z-[1] rounded-full bg-theme-accent px-2.5 py-0.5 text-[10px] font-semibold text-theme-accent-fg">
          Free estimate
        </span>

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-5">
          <div className="flex flex-col items-center gap-1">
            <div className="grid h-[56px] w-[56px] place-items-center rounded-xl border border-theme-border bg-theme-input-bg text-theme-fg-muted">
              <Refrigerator className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <span className="text-[11px] font-medium text-theme-fg-faint">Your appliance</span>
          </div>

          <div className="trade-in-hero-connector my-2 flex flex-col items-center gap-0.5 text-theme-accent">
            <ChevronDown className="h-4 w-4 opacity-70" strokeWidth={2.5} />
            <div className="flex items-center gap-1 rounded-full border border-theme-accent/30 bg-theme-accent/10 px-2.5 py-1">
              <IndianRupee className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold">Fair value</span>
            </div>
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <InstantValueAnimatedIcon boxClass="h-[56px] w-[56px]" iconClass="h-7 w-7" />
            <span className="text-[11px] font-semibold text-theme-accent">Instant value</span>
          </div>
        </div>

        <div className="border-t border-theme-border bg-theme-input-bg/80 px-3 py-2.5">
          <div className="flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-theme-accent trade-in-hero-dot" />
            <p className="text-[11px] font-medium text-theme-fg-muted">Sell · Trade-in · Upgrade</p>
          </div>
        </div>
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
      <div className="trade-in-hero-inner mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 lg:max-w-6xl lg:py-12 xl:py-14">
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8 xl:gap-12">
          <div className="flex min-h-0 flex-1 flex-col lg:justify-center">
            <div className="shrink-0">
              <h1
                id="trade-in-hero-heading"
                className="text-[26px] font-semibold leading-[1.12] tracking-tight text-theme-fg sm:text-[32px] lg:text-[40px] xl:text-[44px]"
              >
                Sell Your Appliance. Get Instant Value.
              </h1>

              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-theme-fg-muted sm:mt-3 sm:text-[15px] lg:max-w-lg">
                Free valuation, fair pricing, and easy upgrade to premium refurbished appliances.
              </p>

              <div className="mt-4 grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2 lg:mt-7">
                <CtaButton href={TRADE_IN_LINKS.estimator} size="lg" fullWidth>
                  Get Valuation
                  <ArrowUpRight className="h-4 w-4" />
                </CtaButton>
                <a
                  href={TRADE_IN_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={mobileCta}
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-theme-accent" />
                  WhatsApp Expert
                </a>
              </div>
            </div>

            <TradeInHeroVisual layout="vertical" className="mt-3 min-h-[168px] flex-1 lg:hidden" />
          </div>

          <div className="hidden lg:flex lg:min-h-[320px] lg:items-stretch">
            <TradeInHeroVisual layout="vertical" className="h-full min-h-[320px] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
