"use client";

import { cn } from "@/lib/utils";

export type ProductBadgeProps = {
  label: string;
  tone?: "neutral" | "premium" | "warranty";
  scheme?: "dark" | "light";
  className?: string;
};

export default function ProductBadge({
  label,
  tone = "neutral",
  scheme = "dark",
  className,
}: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-[11px] font-medium tracking-wide",
        "border backdrop-blur-md",
        scheme === "dark"
          ? tone === "premium"
            ? "border-white/20 bg-white/[0.08] text-white"
            : tone === "warranty"
              ? "border-white/12 bg-white/[0.06] text-white/75"
              : "border-white/12 bg-white/[0.05] text-white/70"
          : tone === "premium"
            ? "border-black/10 bg-black/[0.04] text-black"
            : tone === "warranty"
              ? "border-black/10 bg-black/[0.04] text-black/75"
              : "border-black/10 bg-white/70 text-black/70",
        className,
      )}
    >
      {label}
    </span>
  );
}

