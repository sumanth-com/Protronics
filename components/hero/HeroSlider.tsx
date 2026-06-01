"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import { DESKTOP_HERO_SLIDES, MOBILE_HERO_SLIDES } from "@/lib/hero-slides";
import TrustMetrics from "@/components/hero/TrustMetrics";
import SliderControls from "@/components/hero/SliderControls";
import HeroSlide, { type Slide } from "@/components/hero/HeroSlide";
import MobileHeroCarousel from "@/components/hero/MobileHeroCarousel";

const HERO_DOTS_STYLE = `
  .swiper,
  .swiper-wrapper,
  .swiper-slide {
    height: 100%;
  }
  .hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.22);
    transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease;
    display: inline-block;
  }
  .hero-dot-active {
    width: 28px;
    background: rgba(255, 255, 255, 0.88);
  }
  .hero-mobile-swiper,
  .hero-mobile-swiper .swiper-wrapper,
  .hero-mobile-swiper .swiper-slide {
    width: 100% !important;
  }
`;

function toSlides(images: typeof MOBILE_HERO_SLIDES): Slide[] {
  return images.map((imageSrc) => ({ imageSrc }));
}

export default function HeroSlider() {
  const mobileSlides = useMemo(() => MOBILE_HERO_SLIDES, []);
  const desktopSlides = useMemo(() => toSlides(DESKTOP_HERO_SLIDES), []);

  return (
    <section className="hero-section relative overflow-hidden bg-theme-bg max-lg:bg-theme-bg">
      <div className="hero-slider-wrap w-full">
        <div
          className={cn(
            "theme-preserve-dark hero-slider-shell relative overflow-hidden rounded-2xl sm:rounded-[32px] lg:rounded-[32px]",
            "max-lg:overflow-hidden max-lg:rounded-none",
            "border border-white/10 bg-black",
            "max-lg:shadow-[var(--theme-shadow-sm)]",
            "lg:border-white/10 lg:bg-white/[0.03] lg:shadow-[0_40px_160px_rgba(0,0,0,0.75)]",
          )}
        >
          {/* Mobile + tablet — full-width banner slides */}
          <MobileHeroCarousel slides={mobileSlides} className="lg:hidden" />

          {/* Desktop */}
          <div className="absolute inset-0 hidden lg:block">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
              pagination={{
                el: ".hero-dots",
                clickable: true,
                bulletClass: "hero-dot",
                bulletActiveClass: "hero-dot-active",
              }}
              autoplay={{ delay: 5200, disableOnInteraction: false }}
              speed={700}
              loop
              className="h-full w-full"
            >
              {desktopSlides.map((s, i) => (
                <SwiperSlide key={`d-${i}`}>
                  <HeroSlide slide={s} priority={i === 0} variant="desktop" />
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderControls />
          </div>

          <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 hidden -translate-x-1/2 items-center lg:bottom-5 lg:flex">
            <div className="hero-dots-pill pointer-events-auto rounded-full border border-white/10 bg-black/55 px-3 py-2">
              <div className="hero-dots flex items-center gap-2" />
            </div>
          </div>

          <style jsx global>
            {HERO_DOTS_STYLE}
          </style>
        </div>
      </div>

      <TrustMetrics />
    </section>
  );
}
