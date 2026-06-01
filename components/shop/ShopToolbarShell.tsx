"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

/** Fixed filter block on mobile; products start below via --shop-header-pad. */
export default function ShopToolbarShell({ children }: Props) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    const header = document.querySelector<HTMLElement>(".shop-route-header");

    const measure = () => {
      const nav = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      const bar = toolbar ? Math.ceil(toolbar.getBoundingClientRect().height) : 0;
      setNavHeight(nav);
      setToolbarHeight(bar);
      const pad = nav + bar;
      if (pad > 0) {
        document.documentElement.style.setProperty("--shop-header-pad", `${pad}px`);
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (toolbar) ro.observe(toolbar);
    if (header) ro.observe(header);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      document.documentElement.style.removeProperty("--shop-header-pad");
    };
  }, []);

  const topPx = navHeight > 0 ? navHeight : undefined;

  return (
    <div
      ref={toolbarRef}
      style={topPx != null ? { top: topPx } : undefined}
      className={cn(
        "shop-sticky-toolbar z-40 border-b border-theme-border bg-theme-bg",
        "max-lg:fixed max-lg:inset-x-0",
        "lg:sticky lg:top-[var(--navbar-offset)] lg:z-[49]",
      )}
    >
      {children}
    </div>
  );
}
