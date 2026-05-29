"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutAmbient from "@/components/about/AboutAmbient";
import CtaButton from "@/components/ui/CtaButton";
import HeroImage from "@/assets/2.png";
import { ABOUT_LINKS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const orbRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const media = mediaRef.current;
    if (!orb || !media) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        orb,
        { y: -10 },
        {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: orb,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

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
    }, orb);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-black"
    >
      <AboutAmbient variant="hero" />
      <div
        ref={orbRef}
        className="pointer-events-none absolute -right-40 top-16 h-[520px] w-[520px] rounded-full bg-[#39ff88]/[0.08] blur-3xl"
      />

      <div
        className={cn(
          "relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10",
          "px-4 sm:px-6 md:grid-cols-12",
          "min-h-[calc(100svh-60px)] sm:min-h-[calc(100svh-64px)]",
          "py-12 md:py-16",
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
            className="text-[12px] font-medium tracking-[0.22em] text-[#39ff88]/80"
          >
            REFURBISHED · CERTIFIED · WARRANTY BACKED
          </motion.p>

          <motion.h1
            id="about-hero-heading"
            variants={fadeUp}
            className={cn(
              "mt-4 text-[40px] font-semibold tracking-tight text-white",
              "leading-[1.06] sm:text-[52px] lg:text-[58px]",
            )}
          >
            Premium Appliances.
            <br />
            Professionally Renewed.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[15px] leading-7 text-white/70"
          >
            Protronics brings high-quality refurbished appliances back to life
            through rigorous testing, restoration, and certification.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CtaButton href={ABOUT_LINKS.collection} size="lg" fullWidth className="sm:w-auto">
              Explore Collection
              <ArrowUpRight className="h-4 w-4 text-black/80" />
            </CtaButton>

            <a
              href={ABOUT_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto",
                "border border-white/15 bg-white/[0.06] px-6 py-3.5",
                "text-[13px] font-semibold text-white",
                "transition-colors hover:bg-white/[0.09] active:bg-white/[0.06]",
              )}
            >
              WhatsApp Inquiry
              <MessageCircle className="h-4 w-4 text-[#39ff88]/90" />
            </a>
          </motion.div>
        </motion.div>

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
            <div ref={mediaRef} className="relative aspect-[16/11] w-full">
              <Image
                src={HeroImage}
                alt="Premium refurbished refrigerator in a modern kitchen"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={92}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_520px_at_70%_30%,rgba(57,255,136,0.12),transparent_60%)]" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {["100+ checks", "Deep sanitized", "1-year warranty"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/80 supports-[backdrop-filter]:backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
