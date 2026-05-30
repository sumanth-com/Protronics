"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  location?: string;
  rating?: number; // 1-5
  verified?: boolean;
  homeImageSrc?: string;
};

export type TestimonialCardProps = {
  testimonial: Testimonial;
  /** Compact stack cards — shorter padding & quote clamp for column balance */
  size?: "default" | "compact";
  className?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCard({
  testimonial,
  size = "default",
  className,
}: TestimonialCardProps) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));
  const compact = size === "compact";

  return (
    <motion.article
      whileHover={{ y: compact ? -2 : -3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden border border-white/12 bg-black",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)] will-change-transform",
        compact ? "flex h-full min-h-0 flex-col rounded-2xl p-4" : "rounded-3xl p-6",
        className,
      )}
    >
      <div className={cn("relative flex flex-col", compact && "min-h-0 flex-1")}>
        {testimonial.homeImageSrc ? (
          <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white aspect-[16/9]">
            <Image
              src={testimonial.homeImageSrc}
              alt={`Home setup - ${testimonial.name}`}
              fill
              sizes="(max-width: 768px) 88vw, 33vw"
              className="object-cover"
              quality={92}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_70%)]" />
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className={cn(
                "grid shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.05] font-semibold tracking-wide text-white/80",
                compact ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-[12px]",
              )}
            >
              {initials(testimonial.name)}
            </div>
            <div className="min-w-0">
              <div
                className={cn(
                  "font-semibold text-white",
                  compact ? "text-[12px] leading-tight" : "text-[13px]",
                )}
              >
                {testimonial.name}
              </div>
              {testimonial.location ? (
                <div
                  className={cn(
                    "text-white/55",
                    compact ? "text-[11px] leading-tight" : "text-[12px]",
                  )}
                >
                  {testimonial.location}
                </div>
              ) : null}
            </div>
          </div>

          {testimonial.verified ? (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/[0.05] font-medium tracking-wide text-white/70",
                compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]",
              )}
            >
              <BadgeCheck className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5", "text-white")} />
              Verified
            </span>
          ) : null}
        </div>

        <div className={cn("flex items-center gap-0.5", compact ? "mt-2.5" : "mt-4")}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                compact ? "h-3.5 w-3.5" : "h-4 w-4",
                i < rating ? "text-white" : "text-white/20",
              )}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
          <span
            className={cn(
              "ml-1.5 font-medium text-white/55",
              compact ? "text-[11px]" : "text-[12px]",
            )}
          >
            {rating.toFixed(1)}
          </span>
        </div>

        <div
          className={cn(
            "text-white/75",
            compact
              ? "mt-2 flex-1 text-[12px] leading-5 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
              : "mt-4 text-[13px] leading-7 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]",
            "overflow-hidden",
          )}
        >
          {testimonial.quote}
        </div>
      </div>
    </motion.article>
  );
}

