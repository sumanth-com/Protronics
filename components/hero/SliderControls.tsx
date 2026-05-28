"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SliderControlsProps = {
  className?: string;
};

export default function SliderControls({ className }: SliderControlsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2">
        <button
          type="button"
          aria-label="Previous slide"
          className={cn(
            "hero-prev group grid h-11 w-11 place-items-center rounded-full",
            "border border-white/10 bg-black/40",
            "supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl",
            "shadow-[0_24px_70px_rgba(0,0,0,0.70)]",
          )}
        >
          <ChevronLeft className="h-5 w-5 text-white/75 transition-colors group-hover:text-white" />
        </button>
      </div>
      <div className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2">
        <button
          type="button"
          aria-label="Next slide"
          className={cn(
            "hero-next group grid h-11 w-11 place-items-center rounded-full",
            "border border-white/10 bg-black/40",
            "supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl",
            "shadow-[0_24px_70px_rgba(0,0,0,0.70)]",
          )}
        >
          <ChevronRight className="h-5 w-5 text-white/75 transition-colors group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}

