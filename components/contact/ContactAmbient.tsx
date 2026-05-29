"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ContactAmbientProps = {
  className?: string;
  variant?: "hero" | "section" | "cta";
};

const ContactAmbient = forwardRef<HTMLDivElement, ContactAmbientProps>(
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
              ? "bg-[radial-gradient(900px_500px_at_50%_0%,rgba(57,255,136,0.10),transparent_55%)]"
              : "bg-[radial-gradient(900px_520px_at_50%_-10%,rgba(57,255,136,0.10),transparent_60%)]",
          )}
        />
        {variant === "cta" ? (
          <div className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-[#39ff88]/[0.08] blur-3xl" />
        ) : null}
      </div>
    );
  },
);

ContactAmbient.displayName = "ContactAmbient";

export default ContactAmbient;
