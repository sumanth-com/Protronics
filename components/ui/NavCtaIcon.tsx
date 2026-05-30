"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavCtaIconProps = {
  children: ReactNode;
  variant: "shop" | "deals";
  className?: string;
};

const shopMotion = {
  animate: {
    y: [0, -2.5, 0],
    rotate: [0, -3, 3, 0],
    scale: [1, 1.06, 1],
  },
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const dealsMotion = {
  animate: {
    y: [0, -2, 0],
    rotate: [0, -8, 8, 0],
    scale: [1, 1.08, 1],
  },
  transition: {
    duration: 2.8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Animated icon bubble on navbar CTAs — high contrast, subtle glow. */
export default function NavCtaIcon({ children, variant, className }: NavCtaIconProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span
        className={cn(
          "nav-cta-icon-bubble inline-flex shrink-0 items-center justify-center",
          variant === "deals" && "nav-cta-icon-bubble-deals",
          variant === "shop" && "nav-cta-icon-bubble-shop",
          className,
        )}
        aria-hidden
      >
        {children}
      </span>
    );
  }

  const motionProps = variant === "shop" ? shopMotion : dealsMotion;

  return (
    <motion.span
      className={cn(
        "nav-cta-icon-bubble inline-flex shrink-0 items-center justify-center",
        variant === "deals" && "nav-cta-icon-bubble-deals",
        variant === "shop" && "nav-cta-icon-bubble-shop",
        className,
      )}
      animate={motionProps.animate}
      transition={motionProps.transition}
      aria-hidden
    >
      {children}
    </motion.span>
  );
}
