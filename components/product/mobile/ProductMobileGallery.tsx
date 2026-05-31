"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type ProductMobileGalleryProps = {
  images: string[];
  alt: string;
};

function getTouchDistance(touches: TouchList) {
  if (touches.length < 2) return 0;
  const dx = touches[0]!.clientX - touches[1]!.clientX;
  const dy = touches[0]!.clientY - touches[1]!.clientY;
  return Math.hypot(dx, dy);
}

export default function ProductMobileGallery({ images, alt }: ProductMobileGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [fsScale, setFsScale] = useState(1);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const pinchStart = useRef(0);
  const fsPinchStart = useRef(0);

  const goToSlide = useCallback((index: number) => {
    setActive(index);
    setScale(1);
    swiperRef.current?.slideTo(index);
  }, []);

  const handlePinch = useCallback(
    (
      touches: TouchList,
      startRef: React.MutableRefObject<number>,
      setter: Dispatch<SetStateAction<number>>,
    ) => {
      const dist = getTouchDistance(touches);
      if (touches.length === 2) {
        if (startRef.current > 0) {
          setter((prev) => Math.min(3, Math.max(1, prev * (dist / startRef.current))));
        }
        startRef.current = dist;
      } else {
        startRef.current = 0;
      }
    },
    [],
  );

  return (
    <>
      <div className="pdp-mobile-gallery relative border-y border-theme-border bg-theme-surface">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          speed={280}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.activeIndex);
            setScale(1);
          }}
          className="pdp-gallery-swiper w-full"
          data-lenis-prevent
        >
          {images.map((img, i) => (
            <SwiperSlide key={img + i}>
              <div
                className="relative aspect-[4/5] max-h-[min(52vh,420px)] w-full touch-none bg-theme-bg-secondary"
                onTouchMove={(e) => handlePinch(e.touches, pinchStart, setScale)}
                onTouchEnd={() => {
                  pinchStart.current = 0;
                  if (scale < 1.05) setScale(1);
                }}
              >
                <motion.div
                  className="absolute inset-0 origin-center"
                  animate={{ scale }}
                  transition={{ duration: 0.12, ease: "linear" }}
                >
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-contain object-center p-2"
                    quality={90}
                    draggable={false}
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <span className="absolute left-3 top-3 z-10 rounded-md border border-theme-border bg-theme-elevated/90 px-2 py-0.5 text-[11px] font-medium text-theme-fg backdrop-blur-sm">
          {active + 1}/{images.length}
        </span>

        <button
          type="button"
          onClick={() => {
            setFsScale(1);
            setFullscreen(true);
          }}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-theme-border bg-theme-elevated/90 text-theme-fg backdrop-blur-sm touch-manipulation"
          aria-label="Fullscreen preview"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        <div
          className="flex gap-1.5 overflow-x-auto bg-theme-surface px-3 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent
        >
          {images.map((img, i) => (
            <button
              key={`thumb-${img}-${i}`}
              type="button"
              onClick={() => goToSlide(i)}
              className={cn(
                "relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border touch-manipulation bg-theme-bg-secondary",
                i === active ? "border-theme-accent opacity-100" : "border-theme-border opacity-70",
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="44px" />
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
            className="fixed inset-0 z-[110] flex flex-col bg-black/95"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[13px] text-white/70">
                {active + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                initialSlide={active}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  setActive(swiper.activeIndex);
                  setFsScale(1);
                }}
                className="h-full w-full flex-1"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={`fs-${img}-${i}`}>
                    <div
                      className="relative flex h-full min-h-[60vh] items-center justify-center touch-none"
                      onTouchMove={(e) => handlePinch(e.touches, fsPinchStart, setFsScale)}
                      onTouchEnd={() => {
                        fsPinchStart.current = 0;
                        if (fsScale < 1.05) setFsScale(1);
                      }}
                    >
                      <motion.div
                        className="relative h-[min(72vh,640px)] w-full origin-center"
                        animate={{ scale: fsScale }}
                        transition={{ duration: 0.12, ease: "linear" }}
                      >
                        <Image
                          src={img}
                          alt={alt}
                          fill
                          className="object-contain"
                          quality={95}
                          draggable={false}
                        />
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className="pb-6 text-center text-[11px] text-white/40">Pinch to zoom · Swipe to browse</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
