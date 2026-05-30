"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/** Scroll to element or top — works with or without Lenis. */
export function scrollToTarget(
  lenis: Lenis | null,
  target: number | string | HTMLElement,
  options?: { offset?: number; immediate?: boolean },
) {
  const offset = options?.offset ?? 0;
  const immediate = options?.immediate ?? false;

  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration: immediate ? 0 : 0.65 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  const el =
    typeof target === "string"
      ? document.querySelector(target)
      : target;
  if (!el || !(el instanceof HTMLElement)) return;

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

export async function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  ScrollTrigger.refresh();
}
