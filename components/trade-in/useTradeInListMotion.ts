"use client";

import { useMobileLiteMotion } from "@/hooks/useMobileLiteMotion";
import { fadeUp, stagger } from "@/lib/animations";

const staticChild = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

/** Stagger list motion on desktop; static on mobile to avoid scroll jank. */
export function useTradeInListMotion() {
  const lite = useMobileLiteMotion();

  if (lite) {
    return {
      parent: { hidden: {}, show: {} },
      child: staticChild,
      viewport: { once: true as const },
    };
  }

  return {
    parent: stagger,
    child: fadeUp,
    viewport: { once: true as const, margin: "-12% 0px" },
  };
}
