"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="legal-reading-progress pointer-events-none fixed inset-x-0 top-[var(--navbar-offset)] z-[45] h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn(
          "h-full origin-left bg-theme-accent transition-[transform] duration-150 ease-out",
          "shadow-[0_0_12px_color-mix(in_srgb,var(--theme-accent)_50%,transparent)]",
        )}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
