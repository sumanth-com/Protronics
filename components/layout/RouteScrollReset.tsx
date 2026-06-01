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
    const run = () => resetScrollToTop(lenis);

    run();

    const raf = requestAnimationFrame(() => {
      run();
      void refreshScrollTriggers();
    });

    const t = window.setTimeout(run, 0);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname, lenis]);

  return null;
}
