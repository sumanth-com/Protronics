"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type UIEvent,
} from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type ProductMobileGalleryProps = {
  images: string[];
  alt: string;
};

type PinchTouchPoint = { clientX: number; clientY: number };

function getTouchDistance(touches: {
  readonly length: number;
  readonly [index: number]: PinchTouchPoint | undefined;
}) {
  if (touches.length < 2) return 0;
  const t0 = touches[0];
  const t1 = touches[1];
  if (!t0 || !t1) return 0;
  return Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
}

export default function ProductMobileGallery({ images, alt }: ProductMobileGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [fsScale, setFsScale] = useState(1);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const fsPinchStart = useRef(0);

  const goToSlide = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({ left: index * width, behavior: "smooth" });
    setActive(index);
  }, []);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const width = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / width);
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const sync = () => {
      const width = el.clientWidth || 1;
      const next = Math.round(el.scrollLeft / width);
      setActive((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const handlePinch = useCallback(
    (
      touches: {
        readonly length: number;
        readonly [index: number]: PinchTouchPoint | undefined;
      },
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
        {/* Native snap carousel — vertical page scroll works over the image */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className={cn(
            "pdp-gallery-scroller flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden",
            "overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {images.map((img, i) => (
            <div
              key={img + i}
              className="relative aspect-[4/5] max-h-[min(52svh,420px)] w-full shrink-0 snap-center snap-always bg-theme-bg-secondary"
            >
              <Image
                src={img}
                alt={alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="pointer-events-none object-contain object-center p-2"
                quality={90}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-md border border-theme-border bg-theme-elevated/90 px-2 py-0.5 text-[11px] font-medium text-theme-fg backdrop-blur-sm">
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

        {images.length > 1 ? (
          <div
            className="pdp-gallery-dots flex items-center justify-center gap-2 py-2.5"
            role="tablist"
            aria-label="Product images"
          >
            {images.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Image ${i + 1} of ${images.length}`}
                onClick={() => goToSlide(i)}
                className={cn(
                  "pdp-gallery-dot touch-manipulation rounded-full transition-[width,background-color,opacity] duration-200",
                  i === active
                    ? "h-1.5 w-5 bg-theme-accent"
                    : "h-1.5 w-1.5 bg-theme-fg/30 hover:bg-theme-fg/50",
                )}
              />
            ))}
          </div>
        ) : (
          <div className="h-2" aria-hidden />
        )}

        <div className="flex justify-center gap-2 overflow-x-auto bg-theme-surface px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={`thumb-${img}-${i}`}
              type="button"
              onClick={() => goToSlide(i)}
              className={cn(
                "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border touch-manipulation bg-theme-bg-secondary",
                i === active
                  ? "border-theme-accent opacity-100"
                  : "border-theme-border opacity-70",
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="48px" />
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
              <p className="pb-6 text-center text-[11px] text-white/40">
                Pinch to zoom · Swipe to browse
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
