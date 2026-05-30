"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import HeroImage from "@/assets/4.png";
import { fadeUp, stagger } from "@/lib/animations";
import { canRunGsapScroll, gsapScroller } from "@/lib/gsapScroll";
import { TRADE_IN_LINKS } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function TradeInHero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canRunGsapScroll()) return;
    const media = mediaRef.current;
    if (!media) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { y: -6 },
        {
          y: 10,
          ease: "none",
          scrollTrigger: {
            trigger: media,
            scroller: gsapScroller(),
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
    <section className="trade-in-hero relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.08),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-12 lg:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="lg:col-span-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[12px] text-white/75"
          >
            <RefreshCw className="h-3.5 w-3.5 text-white" />
            Premium upgrade program
          </motion.div>

          <motion.h1
            variants={fadeUp}
            id="trade-in-hero-heading"
            className="mt-5 text-[34px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[48px] lg:text-[56px]"
          >
            Upgrade Smarter.
            <br />
            <span className="text-white/90">Trade In Your Old Appliance.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[15px] leading-7 text-white/70"
          >
            Turn your old appliance into savings on a professionally restored
            premium appliance—fair value, free evaluation, and hassle-free pickup.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-[13px] font-medium text-white/50"
          >
            Give old appliance → Get value → Upgrade affordably
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <CtaButton href={TRADE_IN_LINKS.estimator} size="lg">
              Start Trade-In
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href={TRADE_IN_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5",
                "border border-white/15 bg-white/[0.04] text-[13px] font-semibold text-white",
                "transition-colors hover:border-white/30 hover:bg-white/[0.08]",
              )}
            >
              <WhatsAppIcon className="h-4 w-4 text-white/85" />
              WhatsApp Expert
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="lg:col-span-6"
        >
          <div
            ref={mediaRef}
            className={cn(
              "theme-preserve-dark trade-in-hero-media relative overflow-hidden rounded-2xl sm:rounded-[32px]",
              "border border-white/10 bg-black",
              "shadow-[0_40px_120px_rgba(0,0,0,0.75)]",
            )}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={HeroImage}
                alt="Old appliance upgraded to premium Protronics appliance"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
                quality={82}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.25))]" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/75 p-3.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-2xl sm:p-4">
              <p className="text-[10px] font-medium tracking-[0.16em] text-white/50 sm:text-[11px]">
                OLD → NEW
              </p>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
                Trade in. Apply credit. Upgrade to certified refurbished.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
