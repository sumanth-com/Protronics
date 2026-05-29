"use client";

import type { ReactNode } from "react";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";

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

  return (
    <div
      ref={ref}
      data-defer-section=""
      style={visible ? undefined : { minHeight }}
      aria-hidden={visible ? undefined : true}
    >
      {visible ? children : null}
    </div>
  );
}
