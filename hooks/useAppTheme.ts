"use client";

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useTheme as useNextTheme } from "next-themes";
import {
  runThemeSpreadTransition,
  type ThemeTransitionOrigin,
} from "@/lib/theme-transition";

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      const current = resolvedTheme === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      runThemeSpreadTransition(next, () => flushSync(() => setTheme(next)), origin);
    },
    [resolvedTheme, setTheme],
  );

  const setPreference = useCallback(
    (pref: "light" | "dark" | "system") => {
      if (pref === "system") {
        setTheme("system");
        return;
      }
      const current = resolvedTheme === "light" ? "light" : "dark";
      if (pref === current) return;
      runThemeSpreadTransition(pref, () => flushSync(() => setTheme(pref)));
    },
    [resolvedTheme, setTheme],
  );

  return {
    theme: resolvedTheme === "light" ? "light" : "dark",
    preference: (theme ?? "system") as "light" | "dark" | "system",
    resolvedTheme,
    systemTheme,
    setTheme,
    setPreference,
    toggleTheme,
  };
}
