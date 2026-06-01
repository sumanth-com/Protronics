"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SPLASH_EXIT_AT_MS,
  SPLASH_HIDE_AT_MS,
  SPLASH_SESSION_KEY,
  SPLASH_START_KEY,
} from "@/lib/splash";

const SPLASH_STATIC_ID = "splash-static";

const noopSubscribe = () => () => {};

function readShouldShowSplash(): boolean {
  if (sessionStorage.getItem(SPLASH_SESSION_KEY) === "1") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    return false;
  }

  return true;
}

/** Time left until `targetMs` from first paint (blocking script), not React mount. */
function msUntilSplashEvent(targetMs: number): number {
  try {
    const raw = sessionStorage.getItem(SPLASH_START_KEY);
    const start = raw ? Number(raw) : Number.NaN;
    if (!Number.isFinite(start)) return targetMs;
    return Math.max(0, targetMs - (Date.now() - start));
  } catch {
    return targetMs;
  }
}

function clearSplashActive() {
  const root = document.documentElement;
  root.classList.remove("splash-active", "splash-exiting", "splash-reveal");
  root.style.removeProperty("background-color");
  document.getElementById(SPLASH_STATIC_ID)?.classList.remove("splash-static-exiting");

  try {
    sessionStorage.removeItem(SPLASH_START_KEY);
  } catch {
    /* ignore */
  }
}

/** Timers + classes only — visuals live in #splash-static (layout) + CSS. */
export default function SplashScreen() {
  const shouldShow = useSyncExternalStore(
    noopSubscribe,
    readShouldShowSplash,
    () => false,
  );

  useEffect(() => {
    if (!shouldShow) {
      if (!document.documentElement.classList.contains("splash-active")) {
        return;
      }
      clearSplashActive();
      return;
    }

    document.documentElement.classList.add("splash-active");

    try {
      if (!sessionStorage.getItem(SPLASH_START_KEY)) {
        sessionStorage.setItem(SPLASH_START_KEY, String(Date.now()));
      }
    } catch {
      /* ignore */
    }

    const exitTimer = window.setTimeout(() => {
      document.documentElement.classList.add("splash-exiting", "splash-reveal");
      document.getElementById(SPLASH_STATIC_ID)?.classList.add("splash-static-exiting");
    }, msUntilSplashEvent(SPLASH_EXIT_AT_MS));

    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      clearSplashActive();
    }, msUntilSplashEvent(SPLASH_HIDE_AT_MS));

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [shouldShow]);

  return null;
}
