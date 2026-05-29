"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type AboutAmbientProps = {
  className?: string;
  variant?: "hero" | "section" | "cta";
};

const AboutAmbient = forwardRef<HTMLDivElement, AboutAmbientProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-black", className)}
      />
    );
  },
);

AboutAmbient.displayName = "AboutAmbient";

export default AboutAmbient;
