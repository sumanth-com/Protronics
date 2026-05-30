"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Instant scroll to top on route change — no smooth delay. */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
