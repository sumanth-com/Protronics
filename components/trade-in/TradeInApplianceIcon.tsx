"use client";

import { cn } from "@/lib/utils";

function RealisticFridgeSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-theme-fg-muted", className)}
      aria-hidden
    >
      <rect x="14" y="64" width="6" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
      <rect x="36" y="64" width="6" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />

      <rect
        x="10"
        y="6"
        width="36"
        height="58"
        rx="4"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.25"
      />

      <rect
        x="13"
        y="9"
        width="30"
        height="22"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      <rect
        x="13"
        y="33"
        width="30"
        height="28"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      <line
        x1="13"
        y1="32"
        x2="43"
        y2="32"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1"
      />

      <rect x="37.5" y="14" width="2.5" height="10" rx="1.25" fill="var(--theme-accent)" />
      <rect x="37.5" y="38" width="2.5" height="14" rx="1.25" fill="var(--theme-accent)" />

      <rect x="16" y="12" width="10" height="3" rx="1" fill="currentColor" fillOpacity="0.14" />
      <circle cx="18" cy="13.5" r="0.75" fill="var(--theme-accent)" />

      <line
        x1="16"
        y1="42"
        x2="40"
        y2="42"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.75"
      />
      <line
        x1="16"
        y1="50"
        x2="40"
        y2="50"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.75"
      />
    </svg>
  );
}

export default function TradeInApplianceIcon({
  boxClass,
  iconClass,
}: {
  boxClass: string;
  iconClass: string;
}) {
  return (
    <div
      className={cn(
        "trade-in-appliance-stage relative overflow-hidden rounded-xl border border-theme-border bg-theme-input-bg",
        boxClass,
      )}
    >
      <div className="trade-in-valuation-scan pointer-events-none absolute inset-0 z-[2]" aria-hidden />

      <div className="trade-in-sparkles pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <span className="trade-in-sparkle trade-in-sparkle--1" />
        <span className="trade-in-sparkle trade-in-sparkle--2" />
        <span className="trade-in-sparkle trade-in-sparkle--3" />
      </div>

      <div
        className="trade-in-valuation-stamp pointer-events-none absolute right-2 top-2 z-[3] grid h-6 w-6 place-items-center rounded-full bg-theme-accent text-theme-accent-fg"
        aria-hidden
      >
        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <path
            d="M2.5 6.2 5 8.7 9.5 3.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-[1] grid h-full w-full place-items-center">
        <RealisticFridgeSvg className={cn("drop-shadow-sm", iconClass)} />
      </div>
    </div>
  );
}
