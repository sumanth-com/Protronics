"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slide1 from "@/assets/1.png";
import Slide2 from "@/assets/2.png";
import Slide3 from "@/assets/3.png";
import Slide4 from "@/assets/4.png";
import Slide5 from "@/assets/5.png";
import HeroButtons from "@/components/hero/HeroButtons";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const slides = useMemo(
    () => [
      { src: Slide1, alt: "Premium renewed refrigerator — lifestyle slide 1" },
      { src: Slide2, alt: "Premium renewed refrigerator — lifestyle slide 2" },
      { src: Slide3, alt: "Premium renewed refrigerator — lifestyle slide 3" },
      { src: Slide4, alt: "Premium renewed refrigerator — lifestyle slide 4" },
      { src: Slide5, alt: "Premium renewed refrigerator — lifestyle slide 5" },
    ],
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { y: -8 },
        {
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: media,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, media);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className={cn(
          "relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10",
          "px-4 sm:px-6 md:grid-cols-12",
          /*
           * Keep the entire hero within the visible viewport (no next section peeking).
           * Topbar (36px) + Navbar (~68px) ≈ 104px.
           */
          "min-h-[calc(100svh-104px)]",
          "pt-8 pb-8 md:pt-10 md:pb-10",
        )}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="md:col-span-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            100+ POINT TESTING · 1‑YEAR WARRANTY INCLUDED
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className={cn(
              "mt-4 text-[44px] font-semibold tracking-tight text-white",
              "leading-[1.06]",
              "sm:text-[56px] sm:leading-[1.05]",
              "lg:text-[66px]",
            )}
          >
            1000+ Homes
            <br />
            Trust Protronics
            <br />
            for Premium Renewed
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[14px] leading-6 text-white/70 sm:text-[15px] sm:leading-7"
          >
            Professionally restored appliances engineered for modern living—clean
            finish, verified performance, and warranty‑backed support.
          </motion.p>

          <motion.div variants={fadeUp}>
            <HeroButtons />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-3 text-[12px] text-white/65"
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5">
              Rated <span className="font-semibold text-white/85">4.9</span>
              <span className="text-white/90">★</span> by customers
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline">Bengaluru delivery & setup</span>
          </motion.div>
        </motion.div>

        {/* Media: cinematic slideshow */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="md:col-span-6"
        >
          <motion.div
            variants={fadeUp}
            className={cn(
              "relative overflow-hidden rounded-[32px]",
              "border border-white/12 bg-white/[0.05]",
              "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
              "shadow-[0_40px_140px_rgba(0,0,0,0.70)]",
            )}
          >
            <div
              ref={mediaRef}
              className="relative aspect-[16/11] w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[active]!.src}
                    alt={slides[active]!.alt}
                    fill
                    priority={active === 0}
                    className="object-cover"
                    quality={92}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.70),rgba(0,0,0,0.10)_60%,rgba(0,0,0,0))]" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* premium dots */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === active
                      ? "w-8 bg-white/70"
                      : "w-2 bg-white/25 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

