"use client";

import { useMemo, useState } from "react";
import { Refrigerator } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All Refrigerators",
  "Single Door",
  "Double Door",
  "Mini Fridges",
  "Premium Hubs",
  "Commercial",
] as const;

export default function CategoryMenu() {
  const items = useMemo(() => categories, []);
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
<div className="-mx-4 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
          <div className="flex items-center gap-2">
            {items.map((label, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={label}
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
                  <Refrigerator
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-white" : "text-white/45",
                    )}
                  />
                  {label}
                  {isActive ? (
                    <span className="pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] rounded-full bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.04)]" />
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
