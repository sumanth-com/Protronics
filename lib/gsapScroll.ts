/** Lenis uses documentElement as the scroll container via scrollerProxy. */
export function gsapScroller() {
  return document.documentElement;
}

export function canRunGsapScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}
