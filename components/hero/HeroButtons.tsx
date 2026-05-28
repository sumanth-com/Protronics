"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export default function HeroButtons() {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
      <MagneticButton
        type="button"
        strength={0}
        className={cn(
          "h-12 rounded-full px-6",
          "bg-white text-black",
          "shadow-[0_14px_40px_rgba(0,0,0,0.18)]",
        )}
      >
        <span className="text-[13px] font-semibold tracking-wide">
          Explore Collection
        </span>
      </MagneticButton>

      <MagneticButton
        type="button"
        strength={0}
        className={cn(
          "h-12 rounded-full px-6",
          "bg-transparent text-white",
          "border border-white/30",
        )}
      >
        <span className="text-[13px] font-semibold tracking-wide">
          Book Video Demo
        </span>
      </MagneticButton>
    </div>
  );
}

