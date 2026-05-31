"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/images";

type SlideImage = StaticImageData;

type Props = {
  slides: SlideImage[];
  intervalMs?: number;
  className?: string;
};

export default function MobileHeroCarousel({
  slides,
  intervalMs = 4500,
  className,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div className={cn("hero-mobile-track relative w-full overflow-hidden", className)}>
      <div className="relative aspect-[1717/916] w-full">
        <Image
          key={slide.src}
          src={slide}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={IMAGE_QUALITY.hero}
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
          draggable={false}
        />
      </div>

      {slides.length > 1 ? (
        <div
          className="pointer-events-none absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center"
          aria-hidden
        >
          <div className="hero-dots-pill flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-1.5 py-0.5">
            {slides.map((item, i) => (
              <span
                key={item.src}
                className={cn(
                  "hero-dot inline-block rounded-full bg-white/45 transition-all duration-300",
                  i === index && "hero-dot-active bg-theme-accent",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
