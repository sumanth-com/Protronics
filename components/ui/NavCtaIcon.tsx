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
    y: [0, -2, 0],
    rotate: [0, -4, 4, 0],
    scale: [1, 1.1, 1],
  },
  transition: {
    duration: 2.2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const dealsMotion = {
  animate: {
    y: [0, -1.5, 0],
    rotate: [0, -10, 10, 0],
    scale: [1, 1.12, 1],
  },
  transition: {
    duration: 2.6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Animated icon on navbar CTAs — sits flush on the button, no inner pill. */
export default function NavCtaIcon({ children, variant, className }: NavCtaIconProps) {
  const reduced = useReducedMotion();
  const wrapClass = cn(
    "nav-cta-icon-wrap inline-flex shrink-0 items-center justify-center",
    variant === "deals" && "nav-cta-icon-deals",
    variant === "shop" && "nav-cta-icon-shop",
    className,
  );

  if (reduced) {
    return (
      <span className={wrapClass} aria-hidden>
        {children}
      </span>
    );
  }

  const motionProps = variant === "shop" ? shopMotion : dealsMotion;

  return (
    <motion.span
      className={wrapClass}
      animate={motionProps.animate}
      transition={motionProps.transition}
      aria-hidden
    >
      {children}
    </motion.span>
  );
}
