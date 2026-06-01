"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SPLASH_EXIT_AT_MS,
  SPLASH_HIDE_AT_MS,
  SPLASH_SESSION_KEY,
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

function clearSplashActive() {
  const root = document.documentElement;
  root.classList.remove("splash-active", "splash-exiting", "splash-reveal");
  root.style.removeProperty("background-color");
  document.getElementById(SPLASH_STATIC_ID)?.classList.remove("splash-static-exiting");
}

/** Timers + classes only — visuals live in #splash-static (layout) + CSS for zero flash. */
export default function SplashScreen() {
  const shouldShow = useSyncExternalStore(
    noopSubscribe,
    readShouldShowSplash,
    () => false,
  );

  useEffect(() => {
    if (!shouldShow) {
      clearSplashActive();
      return;
    }

    const exitTimer = window.setTimeout(() => {
      document.documentElement.classList.add("splash-exiting", "splash-reveal");
      document.getElementById(SPLASH_STATIC_ID)?.classList.add("splash-static-exiting");
    }, SPLASH_EXIT_AT_MS);

    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      clearSplashActive();
    }, SPLASH_HIDE_AT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [shouldShow]);

  return null;
}
