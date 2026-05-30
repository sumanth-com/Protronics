/** Lenis uses documentElement as the scroll container via scrollerProxy. */
export function gsapScroller() {
  return document.documentElement;
}

export function canRunGsapScroll(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
