"use client";

import { motion } from "framer-motion";
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
    <motion.button
      type="button"
      onClick={() => toggle(productId)}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors",
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
    </motion.button>
  );
}
