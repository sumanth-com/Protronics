"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAppTheme } from "@/hooks/useAppTheme";
import { cn } from "@/lib/utils";

const ROCK_SPRING = { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.75 };

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isLight = theme === "light";

  if (!mounted) {
    return (
      <div className={cn("theme-rocker inline-flex shrink-0", className)} aria-hidden>
        <span className="theme-rocker-well">
          <span className="theme-rocker-cavity">
            <span className="theme-rocker-paddle theme-rocker-paddle--right" />
          </span>
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "theme-rocker group inline-flex shrink-0 rounded-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <span className="theme-rocker-well">
        <span className="theme-rocker-cavity">
          <motion.span
            className={cn(
              "theme-rocker-paddle",
              isLight ? "theme-rocker-paddle--right" : "theme-rocker-paddle--left",
            )}
            animate={{
              y: isLight ? -1 : 1,
            }}
            transition={reduced ? { duration: 0 } : ROCK_SPRING}
          >
            <span className="theme-rocker-sheen" aria-hidden />
            <span
              className={cn(
                "theme-rocker-led theme-rocker-led--left",
                !isLight && "theme-rocker-led--on",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "theme-rocker-led theme-rocker-led--right",
                isLight && "theme-rocker-led--on",
              )}
              aria-hidden
            />
          </motion.span>
        </span>
      </span>
    </button>
  );
}
