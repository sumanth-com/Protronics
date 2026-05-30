"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { refreshScrollTriggers, scrollToTarget, useLenis } from "@/hooks/useLenis";

/** Reset scroll position on route change — synced with Lenis. */
export default function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    scrollToTarget(lenis, 0, { immediate: true });
    const id = requestAnimationFrame(() => {
      void refreshScrollTriggers();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}
