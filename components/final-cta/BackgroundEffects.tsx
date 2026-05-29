"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BackgroundEffectsProps = {
  className?: string;
};

const BackgroundEffects = forwardRef<HTMLDivElement, BackgroundEffectsProps>(
  ({ className }, ref) => {
    return (
      <div className={cn("pointer-events-none absolute inset-0", className)}>
        {/* soft premium gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(57,255,136,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(980px_760px_at_18%_52%,rgba(255,255,255,0.04),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(860px_640px_at_85%_60%,rgba(0,0,0,0.55),transparent_62%)]" />

        <div
          ref={ref}
          className="absolute -left-40 top-16 h-[560px] w-[560px] rounded-full bg-[#39ff88]/[0.06] blur-3xl"
        />
        <div className="absolute -right-44 top-36 h-[620px] w-[620px] rounded-full bg-white/[0.06] blur-3xl" />
      </div>
    );
  },
);

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;

