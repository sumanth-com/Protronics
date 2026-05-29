"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BackgroundEffectsProps = {
  className?: string;
};

const BackgroundEffects = forwardRef<HTMLDivElement, BackgroundEffectsProps>(
  ({ className }, ref) => {
    return <div ref={ref} className={cn("pointer-events-none absolute inset-0 bg-black", className)} />;
  },
);

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;
