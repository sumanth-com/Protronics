"use client";

import { MapPin, Navigation } from "lucide-react";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactLocationMapProps = {
  className?: string;
};

export default function ContactLocationMap({ className }: ContactLocationMapProps) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full min-h-0 flex-col overflow-hidden",
        "rounded-3xl border border-white/12 bg-black",
        "outline-none ring-0 focus-within:outline-none focus-within:ring-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative min-h-0 flex-1 overflow-hidden bg-black",
          "outline-none ring-0",
        )}
      >
        <iframe
          title="Protronics location on Google Maps"
          src={BUSINESS.mapEmbedUrl}
          className={cn(
            "absolute inset-0 h-full w-full border-0",
            "outline-none ring-0 focus:outline-none focus:ring-0",
            "grayscale-[20%] contrast-[1.05] invert-[92%] hue-rotate-180",
          )}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.85),rgba(10,10,10,0.2)_45%,transparent)]" />
      </div>

      <div className="relative shrink-0 border-t border-white/10 bg-black p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06]">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
              Visit us
            </p>
            <p className="mt-1 text-[14px] font-medium leading-6 text-white/90">
              {BUSINESS.address}
            </p>
            <p className="mt-1 text-[12px] text-white/55">{BUSINESS.hours}</p>
          </div>
        </div>
        <a
          href={BUSINESS.mapDirectionsUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full",
            "border border-white/15 bg-white/[0.06] px-4 py-2",
            "text-[13px] font-semibold text-white",
            "transition-colors hover:bg-white/[0.08] active:bg-white/[0.06]",
            "outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          )}
        >
          <Navigation className="h-4 w-4 text-white" />
          Get directions
        </a>
      </div>
    </div>
  );
}
