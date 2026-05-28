"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import TrustMetrics from "@/components/hero/TrustMetrics";
import SliderControls from "@/components/hero/SliderControls";
import HeroSlide, { type Slide } from "@/components/hero/HeroSlide";
import Slide1 from "@/assets/1.png";
import Slide2 from "@/assets/2.png";
import Slide3 from "@/assets/3.png";
import Slide4 from "@/assets/4.png";
import Slide5 from "@/assets/5.png";

export default function HeroSlider() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        imageSrc: Slide1,
      },
      {
        imageSrc: Slide2,
      },
      {
        imageSrc: Slide3,
      },
      {
        imageSrc: Slide4,
      },
      {
        imageSrc: Slide5,
      },
    ],
    [],
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black",
        // keep the whole hero block within the visible viewport (account for fixed navbar)
        "min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-68px)]",
        "flex flex-col",
      )}
    >
      {/* slider */}
      <div className="w-full px-4 pt-5 sm:px-6 lg:px-10">
        <div
          className={cn(
            "relative overflow-hidden rounded-[34px]",
            "border border-white/10 bg-white/[0.03]",
            "supports-[backdrop-filter]:bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-2xl",
            "shadow-[0_40px_160px_rgba(0,0,0,0.75)]",
            // Explicit height to keep trust bar tight and visible
            "h-[460px] sm:h-[500px] lg:h-[540px]",
          )}
        >
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
            speed={900}
            loop
            className="w-full h-full"
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <HeroSlide slide={s} />
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderControls />

          {/* premium dots */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 flex items-center">
            <div className="pointer-events-auto rounded-full border border-white/10 bg-black/55 px-3 py-2 supports-[backdrop-filter]:bg-black/35 supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.70)]">
              <div className="hero-dots flex items-center gap-2" />
            </div>
          </div>

          {/* Swiper bullet styling */}
          <style jsx global>{`
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
              transition: all 280ms cubic-bezier(0.22, 1, 0.36, 1);
              display: inline-block;
            }
            .hero-dot:hover {
              background: rgba(255, 255, 255, 0.42);
            }
            .hero-dot-active {
              width: 28px;
              background: rgba(57, 255, 136, 0.8);
              box-shadow: 0 0 0 6px rgba(57, 255, 136, 0.1);
            }
          `}</style>
        </div>
      </div>

      <TrustMetrics />
    </section>
  );
}

