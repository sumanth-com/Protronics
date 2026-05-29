"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutAmbient from "@/components/about/AboutAmbient";
import CtaButton from "@/components/ui/CtaButton";
import HeroImage from "@/assets/3.png";
import { WHY_LINKS } from "@/lib/why";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function WhyHero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(media, { y: -8 }, {
        y: 12, ease: "none",
        scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, media);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="why-hero-heading" className="relative overflow-hidden bg-black">
      <AboutAmbient variant="hero" />

      <div
        className={cn(
          "relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10",
          "px-4 sm:px-6 md:grid-cols-12",
          "min-h-[calc(100svh-60px)] sm:min-h-[calc(100svh-64px)]",
          "py-12 md:py-16",
        )}
      >
        <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-6">
          <motion.p variants={fadeUp} className="text-[12px] font-medium tracking-[0.22em] text-white/55">
            WHY PROTRONICS
          </motion.p>

          <motion.h1
            id="why-hero-heading"
            variants={fadeUp}
            className="mt-4 text-[40px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[56px]"
          >
            Not Just Refurbished.
            <br />
            Professionally Renewed.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[16px] leading-7 text-white/70">
            Every appliance is carefully inspected, restored, sanitized, and warranty protected
            before reaching your home.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href={WHY_LINKS.shop} size="lg" fullWidth className="sm:w-auto">
              Shop Collection
              <ArrowUpRight className="h-4 w-4 text-black/80" />
            </CtaButton>
            <a
              href={WHY_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto",
                "border border-white/15 bg-white/[0.06] px-6 py-3.5",
                "text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.09]",
              )}
            >
              WhatsApp Inquiry
              <WhatsAppIcon className="h-4 w-4 text-white" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-6">
          <motion.div
            variants={fadeUp}
            className={cn(
              "relative overflow-hidden rounded-[32px]",
              "border border-white/12 bg-white/[0.05]",
              "supports-[backdrop-filter]:backdrop-blur-xl",
              "shadow-[0_40px_140px_rgba(0,0,0,0.70)]",
            )}
          >
            <div ref={mediaRef} className="relative aspect-[16/11] w-full">
              <Image
                src={HeroImage}
                alt="Premium professionally renewed refrigerator"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={92}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15)_55%,transparent)]" />
</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
