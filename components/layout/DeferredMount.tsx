"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { refreshScrollTriggers } from "@/hooks/useLenis";

type DeferredMountProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
};

export default function DeferredMount({
  children,
  minHeight = "480px",
  rootMargin,
}: DeferredMountProps) {
  const { ref, visible } = useDeferredVisible(rootMargin);

  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => {
      void refreshScrollTriggers();
    }, 100);
    return () => window.clearTimeout(id);
  }, [visible]);

  return (
    <div
      ref={ref}
      data-defer-section={visible ? undefined : ""}
      style={visible ? undefined : { minHeight }}
      aria-hidden={visible ? undefined : true}
    >
      {visible ? children : null}
    </div>
  );
}
