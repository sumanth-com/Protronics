"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export default function ProductGallery({ images, alt, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [mobileZoom, setMobileZoom] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const lastTapRef = useRef(0);

  const goToSlide = useCallback((index: number) => {
    setActive(index);
    swiperRef.current?.slideTo(index);
  }, []);

  const handleMobileTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      setMobileZoom((z) => !z);
    }
    lastTapRef.current = now;
  }, []);

  return (
    <>
      <div className={cn("flex h-full min-h-[260px] flex-col gap-2 sm:min-h-[320px] lg:min-h-0", className)}>
        {/* Mobile — swipeable gallery with pagination */}
        <div className="product-gallery-mobile relative min-h-0 flex-1 lg:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            speed={320}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActive(swiper.activeIndex);
              setMobileZoom(false);
            }}
            className="h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-white/[0.08] sm:min-h-[320px]"
            data-lenis-prevent
          >
            {images.map((img, i) => (
              <SwiperSlide key={img + i}>
                <button
                  type="button"
                  className="relative block h-[260px] w-full overflow-hidden bg-black sm:h-[320px]"
                  onClick={handleMobileTap}
                  aria-label={`View image ${i + 1}`}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: mobileZoom && i === active ? 1.35 : 1 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                      quality={92}
                      draggable={false}
                    />
                  </motion.div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm touch-manipulation"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop — hover zoom (unchanged) */}
        <div
          className={cn(
            "relative hidden min-h-0 flex-1 overflow-hidden rounded-2xl bg-black lg:block",
            "border border-white/[0.08]",
          )}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: zoom ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={images[active] ?? images[0]!}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              quality={92}
            />
          </motion.div>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <div
          className="flex shrink-0 gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent
        >
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => goToSlide(i)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border touch-manipulation sm:h-16 sm:w-16",
                i === active ? "border-white/50" : "border-white/10 opacity-70",
              )}
            >
              <Image src={img} alt="" fill className="object-cover object-center" sizes="64px" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/95"
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex min-h-0 flex-1 items-center justify-center p-4 pt-14">
              <div className="relative h-[min(80vh,800px)] w-full max-w-4xl lg:block">
                <div className="hidden h-full lg:block">
                  <Image
                    src={images[active] ?? images[0]!}
                    alt={alt}
                    fill
                    className="object-contain"
                    quality={95}
                  />
                </div>
                <div className="h-full lg:hidden">
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    initialSlide={active}
                    spaceBetween={12}
                    slidesPerView={1}
                    onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                    className="h-full w-full"
                  >
                    {images.map((img, i) => (
                      <SwiperSlide key={`fs-${img}-${i}`}>
                        <div className="relative h-[min(75vh,720px)] w-full">
                          <Image
                            src={img}
                            alt={alt}
                            fill
                            className="object-contain"
                            quality={95}
                            draggable={false}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function TrustBadgeRow({ badges }: { badges: readonly string[] }) {
  return (
    <div className="trust-badge-row gap-1.5" data-lenis-prevent>
      {badges.map((badge) => (
        <span
          key={badge}
          className="trust-badge-item inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white sm:text-[11px]"
        >
          <Check className="h-3 w-3 shrink-0" strokeWidth={2.5} />
          {badge}
        </span>
      ))}
    </div>
  );
}
