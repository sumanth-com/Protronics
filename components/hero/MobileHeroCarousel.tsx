"use client";

import Image, { type StaticImageData } from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/images";
import "swiper/css";
import "swiper/css/pagination";

type SlideImage = StaticImageData;

type Props = {
  slides: SlideImage[];
  intervalMs?: number;
  className?: string;
};

const LAST_SLIDE_OFFER = {
  eyebrow: "Limited offer",
  title: "Up to 30% OFF",
  subtitleLine1: "Certified refurbished",
  subtitleLine2: "Warranty included",
} as const;

export default function MobileHeroCarousel({
  slides,
  intervalMs = 4500,
  className,
}: Props) {
  if (!slides.length) return null;

  const lastIndex = slides.length - 1;

  return (
    <div
      className={cn("hero-mobile-track relative w-full", className)}
      data-lenis-prevent
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        className="hero-mobile-swiper w-full"
        slidesPerView={1}
        spaceBetween={0}
        speed={480}
        loop={slides.length > 1}
        autoplay={
          slides.length > 1
            ? { delay: intervalMs, disableOnInteraction: false, pauseOnMouseEnter: false }
            : false
        }
        pagination={
          slides.length > 1
            ? {
                clickable: true,
                bulletClass: "hero-dot",
                bulletActiveClass: "hero-dot-active",
              }
            : false
        }
        resistanceRatio={0.82}
        touchReleaseOnEdges
        preventInteractionOnTransition
        touchStartPreventDefault={false}
        threshold={6}
        shortSwipes
        longSwipesRatio={0.12}
        watchOverflow
        roundLengths
      >
        {slides.map((slide, i) => {
          const isLast = i === lastIndex;

          return (
            <SwiperSlide key={slide.src} className="hero-mobile-swiper-slide">
              <div className="hero-mobile-banner-frame relative w-full overflow-hidden">
                <Image
                  src={slide}
                  alt={
                    isLast
                      ? "Protronics limited offer on refurbished appliances"
                      : "Protronics refurbished appliance banner"
                  }
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="hero-mobile-banner-img object-cover object-center"
                  quality={IMAGE_QUALITY.hero}
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  draggable={false}
                />

                {isLast ? (
                  <div className="hero-slide-offer">
                    <p className="hero-slide-offer-eyebrow">{LAST_SLIDE_OFFER.eyebrow}</p>
                    <p className="hero-slide-offer-title">{LAST_SLIDE_OFFER.title}</p>
                    <p className="hero-slide-offer-subtitle">
                      <span>{LAST_SLIDE_OFFER.subtitleLine1}</span>
                      <span>{LAST_SLIDE_OFFER.subtitleLine2}</span>
                    </p>
                  </div>
                ) : null}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
