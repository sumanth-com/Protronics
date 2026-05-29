"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export default function ProductGallery({ images, alt, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);

  return (
    <>
      <div className={cn("flex h-full min-h-[260px] flex-col gap-2 sm:min-h-[320px] lg:min-h-0", className)}>
        <div
          className={cn(
            "relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black",
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
        <div className="flex shrink-0 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border sm:h-16 sm:w-16",
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[min(80vh,800px)] w-full max-w-4xl">
              <Image
                src={images[active] ?? images[0]!}
                alt={alt}
                fill
                className="object-contain"
                quality={95}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function TrustBadgeRow({ badges }: { badges: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <span
          key={badge}
          className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white sm:text-[11px]"
        >
          <Check className="h-3 w-3" strokeWidth={2.5} />
          {badge}
        </span>
      ))}
    </div>
  );
}
