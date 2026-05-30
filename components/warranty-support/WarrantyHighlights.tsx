"use client";

import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type WarrantyHighlightsProps = {
  items?: string[];
  className?: string;
};

export default function WarrantyHighlights({
  items = [
    "Certified Testing",
    "Warranty Included",
    "Expert Support",
    "Safe Delivery",
    "Verified Appliances",
  ],
  className,
}: WarrantyHighlightsProps) {
  return (
    <div
      className={cn(
        "warranty-highlights-card rounded-3xl border border-white/12 bg-black",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "px-6 py-6",
        className,
      )}
    >
      <div className="warranty-highlights-label text-[12px] font-medium tracking-[0.22em] text-white/55">
        REASSURANCE, INCLUDED
      </div>
      <div className="warranty-highlights-title mt-3 text-[16px] font-semibold tracking-tight text-white">
        Protection beyond purchase.
      </div>
      <div className="mt-3 h-[2px] w-10 rounded-full bg-white/50 warranty-highlights-divider" />

      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2.5">
            <BadgeCheck className="warranty-highlights-icon h-4 w-4 text-white" />
            <span className="warranty-highlights-item text-[12.5px] leading-6 text-white/75">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

