"use client";

import { useCallback, useRef } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsClient } from "@/hooks/useIsClient";
import { cn } from "@/lib/utils";

function PowerIcon({ lit }: { lit?: boolean }) {
  return (
    <svg
      className="theme-toggle-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        className="theme-toggle-arc"
        d="M18.36 5.64a9 9 0 1 1-12.73 0"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        className={cn("theme-toggle-stem", lit && "theme-toggle-stem--on")}
        d="M12 2v10"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAppTheme();
  const mounted = useIsClient();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isLight = theme === "light";

  const handleToggle = useCallback(() => {
    const rect = btnRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;
    toggleTheme(origin);
  }, [toggleTheme]);

  if (!mounted) {
    return (
      <div
        className={cn("theme-toggle-btn pointer-events-none", className)}
        aria-hidden
      >
        <PowerIcon lit={false} />
      </div>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      role="switch"
      aria-checked={isLight}
      onClick={handleToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "theme-toggle-btn",
        isLight ? "theme-toggle-btn--light-active" : "theme-toggle-btn--dark-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/30 focus-visible:ring-offset-1",
        className,
      )}
    >
      <PowerIcon lit />
    </button>
  );
}
