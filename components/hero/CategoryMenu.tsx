"use client";

import { useMemo, useState } from "react";
import {
  AirVent,
  ChefHat,
  Droplets,
  Ellipsis,
  Fan,
  Refrigerator,
  Tv,
  WashingMachine,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function CategoryMenu() {
  const categories = useMemo<Category[]>(
    () => [
      { label: "All Appliances", icon: Droplets },
      { label: "Refrigerators", icon: Refrigerator },
      { label: "Washing Machines", icon: WashingMachine },
      { label: "Air Conditioners", icon: AirVent },
      { label: "Microwaves", icon: Fan },
      { label: "TVs", icon: Tv },
      { label: "Dishwashers", icon: ChefHat },
      { label: "Small Appliances", icon: Droplets },
      { label: "More", icon: Ellipsis },
    ],
    [],
  );

  const [active, setActive] = useState(0);

  return (
    <div className="w-full px-4 sm:px-5">
      <div
        className={cn(
          "relative mt-2 overflow-hidden rounded-3xl",
          "border border-white/10 bg-white/[0.03]",
          "supports-[backdrop-filter]:bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-2xl",
          "shadow-[0_30px_120px_rgba(0,0,0,0.70)]",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_260px_at_25%_0%,rgba(57,255,136,0.10),transparent_55%)]" />

        <div className="-mx-4 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2">
            {categories.map((c, idx) => {
              const Icon = c.icon;
              const isActive = idx === active;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-2xl px-3 py-2",
                    "text-[12px] font-medium tracking-wide",
                    "transition-colors duration-300",
                    isActive
                      ? "text-[#a9ffcd]"
                      : "text-white/60 hover:text-white/85",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-[#39ff88]" : "text-white/45",
                    )}
                  />
                  {c.label}
                  {isActive ? (
                    <span className="pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] rounded-full bg-[#39ff88]/80 shadow-[0_0_0_6px_rgba(57,255,136,0.10)]" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

