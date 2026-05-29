"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AboutAmbientProps = {
  className?: string;
  variant?: "hero" | "section" | "cta";
};

const AboutAmbient = forwardRef<HTMLDivElement, AboutAmbientProps>(
  ({ className, variant = "section" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div
          className={cn(
            "absolute inset-0",
            variant === "hero"
              ? "bg-[radial-gradient(1000px_560px_at_50%_0%,rgba(57,255,136,0.12),transparent_58%)]"
              : "bg-[radial-gradient(900px_520px_at_50%_-10%,rgba(57,255,136,0.10),transparent_60%)]",
          )}
        />
        {variant === "hero" ? (
          <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        ) : null}
        {variant === "cta" ? (
          <>
            <div className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-[#39ff88]/[0.08] blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-3xl" />
          </>
        ) : null}
      </div>
    );
  },
);

AboutAmbient.displayName = "AboutAmbient";

export default AboutAmbient;
