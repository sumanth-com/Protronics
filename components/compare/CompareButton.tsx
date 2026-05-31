"use client";

import { Scale } from "lucide-react";
import { useCompare } from "@/hooks/useProductStore";
import { cn } from "@/lib/utils";

type CompareButtonProps = {
  productId: string;
  size?: "sm" | "md";
  className?: string;
  variant?: "outline" | "ghost";
};

export default function CompareButton({
  productId,
  size = "md",
  className,
  variant = "outline",
}: CompareButtonProps) {
  const { toggle, isCompared } = useCompare();
  const compared = isCompared(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors touch-manipulation active:scale-[0.98]",
        size === "sm" ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-[12px]",
        variant === "outline" && "compare-toggle",
        variant === "outline" && compared && "compare-toggle--active",
        variant === "ghost" && !compared && "text-white/70 hover:text-white",
        variant === "ghost" && compared && "compare-toggle--active compare-toggle--ghost",
        className,
      )}
    >
      <Scale className={cn("shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      {compared ? "✓ Added To Compare" : "Compare"}
    </button>
  );
}
