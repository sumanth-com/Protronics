"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactLocationMapProps = {
  className?: string;
};

export default function ContactLocationMap({ className }: ContactLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "contact-location-map relative isolate flex h-full min-h-[280px] flex-col overflow-hidden",
        "rounded-3xl border border-white/12 bg-black",
        "outline-none ring-0 focus-within:outline-none focus-within:ring-0",
        "lg:min-h-[420px]",
        className,
      )}
      data-lenis-prevent
    >
      <div
        className={cn(
          "contact-location-map-view relative min-h-[220px] flex-1 overflow-hidden bg-[#0a0a0a] lg:min-h-0",
          "outline-none ring-0",
        )}
      >
        {showMap ? (
          <>
            <iframe
              title="Protronics on Google Maps — Bangalore"
              src={BUSINESS.mapEmbedUrl}
              className={cn(
                "contact-location-map-frame absolute inset-0 h-full w-full border-0",
                "outline-none ring-0 focus:outline-none focus:ring-0",
              )}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={BUSINESS.mapDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-location-map-open absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white px-3 py-1.5 text-[12px] font-semibold text-black shadow-md transition-colors hover:bg-white/95"
            >
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </>
        ) : (
          <div className="contact-location-map-placeholder absolute inset-0 grid place-items-center bg-[#0a0a0a]">
            <MapPin className="h-8 w-8 text-white/25" aria-hidden />
          </div>
        )}
      </div>

      <div className="contact-location-map-panel relative shrink-0 border-t border-white/10 bg-black p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06]">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
              Location
            </p>
            <Link
              href={BUSINESS.mapDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-location-map-link mt-1 inline-flex items-center gap-1 text-[14px] font-semibold leading-6 text-white/90 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              {BUSINESS.address}
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            </Link>
            <p className="mt-1 text-[12px] text-white/55">{BUSINESS.hours}</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <a
            href={BUSINESS.googleBusinessProfileUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "contact-location-map-gbp inline-flex items-center justify-center gap-2 rounded-full",
              "border border-white/15 bg-white/[0.06] px-4 py-2",
              "text-[13px] font-semibold text-white",
              "transition-colors duration-150 hover:bg-white/[0.08] active:bg-white/[0.06]",
              "outline-none focus-visible:ring-2 focus-visible:ring-white/30",
            )}
          >
            <ExternalLink className="h-4 w-4 text-white" aria-hidden />
            Google Business
          </a>
          <a
            href={BUSINESS.mapDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "contact-location-map-directions inline-flex items-center justify-center gap-2 rounded-full",
              "border border-white/15 bg-white/[0.06] px-4 py-2",
              "text-[13px] font-semibold text-white",
              "transition-colors duration-150 hover:bg-white/[0.08] active:bg-white/[0.06]",
              "outline-none focus-visible:ring-2 focus-visible:ring-white/30",
            )}
          >
            <Navigation className="h-4 w-4 text-white" />
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}
