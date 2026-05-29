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
    <div className="w-full px-4 pb-2 sm:px-6 lg:px-10 mt-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "border border-white/10 bg-white/[0.03]",
          "supports-[backdrop-filter]:bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-2xl",
          "shadow-[0_30px_120px_rgba(0,0,0,0.70)]",
        )}
      >
<div className="grid grid-cols-2 gap-2 px-4 py-2 sm:grid-cols-5 sm:gap-0 sm:px-6 sm:py-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.desc}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5",
                  "sm:rounded-none sm:px-0 sm:py-0",
                  "sm:justify-center",
                )}
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-white/85" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-white">
                    {m.title}
                  </div>
                  <div className="text-[12px] text-white/55">{m.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

