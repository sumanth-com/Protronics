"use client";

import { cn } from "@/lib/utils";

export type ProductBadgeProps = {
  label: string;
  tone?: "neutral" | "premium" | "warranty";
  scheme?: "dark" | "light";
  compact?: boolean;
  title?: string;
  className?: string;
};

export default function ProductBadge({
  label,
  tone = "neutral",
  scheme = "dark",
  compact = false,
  title,
  className,
}: ProductBadgeProps) {
  return (
    <span
      title={title ?? label}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full",
        compact ? "px-1.5 py-0.5 text-[10px] tracking-normal" : "px-2.5 py-1 text-[11px] tracking-wide",
        "font-medium",
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

