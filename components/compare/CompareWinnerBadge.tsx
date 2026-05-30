"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareWinnerBadgeProps = {
  label: string;
  className?: string;
};

export default function CompareWinnerBadge({ label, className }: CompareWinnerBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "compare-winner-badge inline-flex items-center gap-1 rounded-full px-2.5 py-1",
        "text-[10px] font-semibold tracking-wide",
        className,
      )}
    >
      <Star className="h-3 w-3" />
      {label}
    </motion.span>
  );
}
