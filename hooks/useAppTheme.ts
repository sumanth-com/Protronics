"use client";

import { useCallback } from "react";
import { useTheme as useNextTheme } from "next-themes";

function pulseThemeTransition() {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 450);
}

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const toggleTheme = useCallback(() => {
    const current = resolvedTheme === "light" ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
    pulseThemeTransition();
  }, [resolvedTheme, setTheme]);

  const setPreference = useCallback(
    (pref: "light" | "dark" | "system") => {
      setTheme(pref);
      pulseThemeTransition();
    },
    [setTheme],
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
