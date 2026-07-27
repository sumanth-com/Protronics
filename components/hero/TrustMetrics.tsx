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
    <div className="hero-trust-zone w-full">
      <div className="hero-trust-grid">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.desc}
              className={cn(
                "hero-trust-card premium-card group relative overflow-hidden",
                "border border-white/[0.08] bg-white/[0.02]",
                "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]",
              )}
            >
              <div className="hero-trust-card-inner">
                <div className="hero-trust-icon-wrap">
                  <Icon className="hero-trust-icon h-4 w-4" strokeWidth={1.85} />
                </div>
                <div className="hero-trust-copy">
                  <div className="hero-trust-title transition-transform duration-300 group-hover:scale-105">
                    {m.title}
                  </div>
                  <div className="hero-trust-desc transition-colors duration-300 group-hover:text-white/70">
                    {m.desc}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
