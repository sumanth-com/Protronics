"use client";

import {
  BadgeCheck,
  Headset,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { icon: BadgeCheck, title: "100+", desc: "Quality Checks" },
  { icon: ShieldCheck, title: "1 Year", desc: "Warranty Included" },
  { icon: Headset, title: "5000+", desc: "Happy Customers" },
  { icon: Truck, title: "Fast & Safe", desc: "Delivery" },
  { icon: Wrench, title: "Dedicated", desc: "Support" },
] as const;

export default function TrustMetrics() {
  return (
    <div className="hero-trust-zone w-full px-4 sm:px-6 lg:px-10">
      <div
        className={cn(
          "hero-trust-bar pointer-events-none relative overflow-hidden rounded-2xl sm:rounded-3xl",
          "border border-theme-border bg-theme-surface-card shadow-theme-sm",
        )}
      >
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5 sm:grid-cols-5 sm:gap-1 sm:px-6 sm:py-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.desc}
                className={cn(
                  "hero-trust-item flex items-center gap-3 px-3 py-2.5",
                  "sm:px-0 sm:py-0 sm:justify-center",
                )}
              >
                <div className="hero-trust-icon-wrap grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl">
                  <Icon className="hero-trust-icon h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="hero-trust-title text-[13px] font-semibold">{m.title}</div>
                  <div className="hero-trust-desc text-[12px]">{m.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
