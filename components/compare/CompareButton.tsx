"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  const handleClick = () => {
    toggle(productId);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors",
        size === "sm" ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-[12px]",
        variant === "outline"
          ? compared
            ? "border-[#39ff88]/40 bg-[#39ff88]/[0.08] text-[#39ff88]"
            : "border-white/15 bg-white/[0.04] text-white hover:border-[#39ff88]/35 hover:bg-[#39ff88]/[0.05]"
          : compared
            ? "bg-[#39ff88]/15 text-[#39ff88]"
            : "text-white/70 hover:text-white",
        className,
      )}
    >
      <Scale className={cn("shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      {compared ? "✓ Added To Compare" : "Compare"}
    </motion.button>
  );
}
