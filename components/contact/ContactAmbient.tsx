"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ContactAmbientProps = {
  className?: string;
  variant?: "hero" | "section" | "cta";
};

const ContactAmbient = forwardRef<HTMLDivElement, ContactAmbientProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-black", className)}
      />
    );
  },
);

ContactAmbient.displayName = "ContactAmbient";

export default ContactAmbient;
