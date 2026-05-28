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
  className,
}: TestimonialCardProps) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/12 bg-white/[0.06]",
        "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
        "shadow-[0_26px_70px_rgba(0,0,0,0.55)]",
        "p-6",
        "will-change-transform",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(680px_260px_at_15%_0%,rgba(255,90,85,0.18),transparent_58%),radial-gradient(520px_240px_at_85%_20%,rgba(255,255,255,0.07),transparent_55%)]" />

      <div className="relative flex flex-col">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-[12px] font-semibold tracking-wide text-white/80">
              {initials(testimonial.name)}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-white">
                {testimonial.name}
              </div>
              {testimonial.location ? (
                <div className="text-[12px] text-white/55">
                  {testimonial.location}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {testimonial.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/70">
                <BadgeCheck className="h-3.5 w-3.5 text-[#ff5a55]/90" />
                Verified
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < rating ? "text-[#ff5a55]/90" : "text-white/20",
              )}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-[12px] font-medium text-white/55">
            {rating.toFixed(1)}
          </span>
        </div>

        <div
          className={cn(
            "mt-4 text-[13px] leading-7 text-white/75",
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]",
          )}
        >
          {testimonial.quote}
        </div>
      </div>
    </motion.article>
  );
}

