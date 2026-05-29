"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CinematicOverlayProps = {
  src: string;
  alt: string;
  className?: string;
};

const CinematicOverlay = forwardRef<HTMLDivElement, CinematicOverlayProps>(
  ({ src, alt, className }, ref) => {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <div ref={ref} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
            quality={92}
          />
        </div>

        {/* cinematic masking + lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.80),rgba(0,0,0,0.40)_55%,rgba(0,0,0,0.15)_78%,rgba(0,0,0,0))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_55%_30%,rgba(57,255,136,0.10),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_25%_60%,rgba(255,255,255,0.05),transparent_62%)]" />
      </div>
    );
  },
);

CinematicOverlay.displayName = "CinematicOverlay";

export default CinematicOverlay;

