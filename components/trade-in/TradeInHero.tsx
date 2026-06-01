"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ClipboardList, HandCoins, IndianRupee } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import TradeInApplianceIcon from "@/components/trade-in/TradeInApplianceIcon";
import { scrollToTarget, useLenis } from "@/hooks/useLenis";
import { NAVBAR_OFFSET } from "@/lib/navigation";
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
        className={cn(
          "trade-in-hero-visual trade-in-hero-visual--horizontal relative mx-auto w-full max-w-[360px]",
          className,
        )}
        aria-hidden
      >
        <div className="relative overflow-hidden rounded-2xl border border-theme-border bg-theme-surface-card shadow-theme-sm">
          <span className="absolute left-1/2 top-3 z-[4] -translate-x-1/2 whitespace-nowrap rounded-full bg-theme-accent px-2.5 py-1 text-[10px] font-semibold leading-none text-theme-accent-fg shadow-theme-sm ring-2 ring-theme-surface-card">
            Free estimate
          </span>

          <div className="flex items-center justify-center gap-2 px-4 pb-4 pt-10 sm:gap-3">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <TradeInApplianceIcon
                boxClass="h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24"
                iconClass="h-[3.25rem] w-auto sm:h-14"
              />
              <span className="text-center text-[12px] font-medium text-theme-fg-faint sm:text-[13px]">
                Your appliance
              </span>
            </div>

            <div className="trade-in-hero-connector flex shrink-0 flex-col items-center gap-1.5 text-theme-accent">
              <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
              <div className="flex items-center gap-1 rounded-full border border-theme-accent/30 bg-theme-accent/10 px-2.5 py-1">
                <IndianRupee className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span className="text-[11px] font-semibold whitespace-nowrap sm:text-[12px]">
                  Fair value
                </span>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <InstantValueAnimatedIcon
                boxClass="h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24"
                iconClass="h-9 w-9 sm:h-10 sm:w-10"
              />
              <span className="text-center text-[12px] font-semibold text-theme-accent sm:text-[13px]">
                Instant value
              </span>
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

  return (
    <div
      className={cn(
        "trade-in-hero-visual trade-in-hero-visual--vertical relative flex w-full flex-col",
        className,
      )}
      aria-hidden
    >
      <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-theme-border bg-theme-surface-card shadow-theme-sm">
        <span className="absolute left-1/2 top-3 z-[4] -translate-x-1/2 whitespace-nowrap rounded-full bg-theme-accent px-2.5 py-1 text-[10px] font-semibold leading-none text-theme-accent-fg shadow-theme-sm ring-2 ring-theme-surface-card">
          Free estimate
        </span>

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-5 pt-10">
          <div className="flex flex-col items-center gap-1">
            <TradeInApplianceIcon boxClass="h-[56px] w-[56px]" iconClass="h-11 w-auto" />
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
  const lenis = useLenis();

  const scrollToValuationForm = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById("sell-form");
    if (!el) return;
    e.preventDefault();
    scrollToTarget(lenis, el, { offset: -NAVBAR_OFFSET });
  };

  return (
    <section
      className={cn(
        "trade-in-hero trade-in-hero-fullscreen border-b border-theme-border",
        tradeInSection,
      )}
    >
      <div className="trade-in-hero-inner mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 lg:max-w-6xl lg:py-12 xl:py-14">
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8 xl:gap-12">
          <div className="trade-in-hero-column flex min-h-0 flex-1 flex-col items-center justify-center gap-5 text-center lg:items-stretch lg:justify-center lg:gap-0 lg:text-left">
            <div className="w-full max-w-[22rem] shrink-0 sm:max-w-md lg:max-w-lg">
              <h1
                id="trade-in-hero-heading"
                className="text-[26px] font-semibold leading-[1.12] tracking-tight text-theme-fg sm:text-[32px] lg:text-[40px] xl:text-[44px]"
              >
                Sell Your Appliance. Get Instant Value.
              </h1>

              <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-theme-fg-muted sm:mt-3 sm:text-[15px] lg:mx-0 lg:max-w-lg">
                Free valuation, fair pricing, and easy upgrade to premium refurbished appliances.
              </p>

              <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-2.5 lg:mt-7">
                <Link
                  href={TRADE_IN_LINKS.valuation}
                  className={cn(mobileCta, "px-2 text-[12px] sm:px-3 sm:text-[13px]")}
                  onClick={scrollToValuationForm}
                >
                  <ClipboardList className="h-4 w-4 shrink-0 text-theme-accent" />
                  <span className="truncate">Get Valuation</span>
                </Link>
                <a
                  href={TRADE_IN_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(mobileCta, "px-2 text-[12px] sm:px-3 sm:text-[13px]")}
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-theme-accent" />
                  <span className="truncate">WhatsApp Expert</span>
                </a>
              </div>
            </div>

            <TradeInHeroVisual
              layout="horizontal"
              className="w-full max-w-[360px] shrink-0 lg:hidden"
            />
          </div>

          <div className="hidden lg:flex lg:min-h-[320px] lg:items-stretch">
            <TradeInHeroVisual layout="vertical" className="h-full min-h-[320px] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
