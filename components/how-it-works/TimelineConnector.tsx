"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type TimelineConnectorProps = {
  orientation: "horizontal" | "vertical";
  className?: string;
};

const TimelineConnector = forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ orientation, className }, ref) => {
    return (
      <div
        className={cn(
          "pointer-events-none absolute",
          orientation === "horizontal"
            ? "left-8 right-8 top-1/2 hidden -translate-y-1/2 md:block"
            : "left-[25px] top-0 bottom-0 md:hidden",
          className,
        )}
      >
        {/* base line */}
        <div
          className={cn(
            "absolute",
            orientation === "horizontal"
              ? "left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10"
              : "left-0 top-0 h-full w-px bg-white/10",
          )}
        />

        {/* progress line (animated via GSAP) */}
        <div
          ref={ref}
          className={cn(
            "absolute",
            orientation === "horizontal"
              ? "left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[linear-gradient(to_right,rgba(255,255,255,0),rgba(255,255,255,0.45),rgba(255,255,255,0))]"
              : "left-0 top-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.45),rgba(255,255,255,0))]",
          )}
          style={{
            transform:
              orientation === "horizontal"
                ? "scaleX(0)"
                : "scaleY(0)",
            transformOrigin: "0% 50%",
          }}
        />
      </div>
    );
  },
);

TimelineConnector.displayName = "TimelineConnector";

export default TimelineConnector;

