"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { refreshScrollTriggers, resetScrollToTop, useLenis } from "@/hooks/useLenis";

/** Reset scroll to top on every route change (before paint + after layout). */
export default function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    resetScrollToTop(lenis);

    const raf = requestAnimationFrame(() => {
      void refreshScrollTriggers();
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, lenis]);

  return null;
}
