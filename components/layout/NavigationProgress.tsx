"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** Thin top progress bar on route change — Linear / Vercel style. */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const done = window.setTimeout(() => setActive(false), 220);
    return () => window.clearTimeout(done);
  }, [pathname]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left",
        "bg-theme-accent transition-transform duration-300 ease-out",
        active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
      )}
      aria-hidden
    />
  );
}
