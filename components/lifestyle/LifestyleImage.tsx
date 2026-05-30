"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { canRunGsapScroll, gsapScroller } from "@/lib/gsapScroll";

gsap.registerPlugin(ScrollTrigger);

export type LifestyleImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function LifestyleImage({ src, alt, className }: LifestyleImageProps) {
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canRunGsapScroll()) return;

    const el = imgRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -8 },
        {
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller: gsapScroller(),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/12 bg-white/[0.04]",
        "shadow-[0_35px_110px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          sizes="(max-width: 768px) 92vw, 50vw"
          className="object-cover"
          quality={92}
        />
      </div>

      {/* cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.70),rgba(0,0,0,0.10)_60%,rgba(0,0,0,0))]" />
{/* soft mask bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)]" />
    </div>
  );
}

