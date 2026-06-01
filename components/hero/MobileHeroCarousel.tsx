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

/** Fixed aspect — prevents layout shift / page shake between slides */
const BANNER_ASPECT = "1717 / 916";

export default function MobileHeroCarousel({
  slides,
  intervalMs = 4500,
  className,
}: Props) {
  if (!slides.length) return null;

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
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.src} className="hero-mobile-swiper-slide">
            <div
              className="hero-mobile-banner-frame relative w-full overflow-hidden"
              style={{ aspectRatio: BANNER_ASPECT }}
            >
              <Image
                src={slide}
                alt=""
                fill
                sizes="100vw"
                className="hero-mobile-banner-img object-cover object-center"
                quality={IMAGE_QUALITY.hero}
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
