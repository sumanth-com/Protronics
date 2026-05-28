"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeHero from "@/assets/HomeHero.png";
import HeroButtons from "@/components/hero/HeroButtons";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: 22,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0"
        >
          <Image
            src={HomeHero}
            alt="Premium refurbished refrigerator"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Keep background clearly visible (no white wash); just add subtle dark contrast for white text */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.52),rgba(0,0,0,0.28)_34%,rgba(0,0,0,0.06)_62%,rgba(0,0,0,0)_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_70%_35%,rgba(0,0,0,0.22),rgba(0,0,0,0)_62%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),rgba(0,0,0,0)_55%)]" />
        </div>

        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-black/[0.03] blur-2xl md:h-72 md:w-72" />
        <div className="absolute -bottom-20 right-24 h-64 w-64 rounded-full bg-black/[0.02] blur-2xl md:h-80 md:w-80" />
      </div>

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
          <motion.h1
            variants={fadeUp}
            className={cn(
              "text-[44px] font-semibold tracking-tight text-white",
              "leading-[1.06]",
              "sm:text-[56px] sm:leading-[1.05]",
              "lg:text-[66px]",
            )}
          >
            Refurbished
            <br />
            Refrigerators That
            <br />
            Feel Brand New
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[14px] leading-6 text-white/70 sm:text-[15px] sm:leading-7"
          >
            Premium cooling technology meets sustainable affordability. Every
            unit undergoes 100+ point testing with a full 1-year warranty.
          </motion.p>

          <motion.div variants={fadeUp}>
            <HeroButtons />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

