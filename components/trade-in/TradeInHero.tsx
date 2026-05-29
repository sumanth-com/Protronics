"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import HeroImage from "@/assets/4.png";
import { fadeUp, stagger } from "@/lib/animations";
import { TRADE_IN_LINKS } from "@/lib/trade-in";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function TradeInHero() {
  const mediaRef = useRef<HTMLDivElement>(null);

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
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:py-20">
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
            <Sparkles className="h-3.5 w-3.5 text-white" />
            Trade-In & Upgrade
          </motion.div>

          <motion.h1
            variants={fadeUp}
            id="trade-in-hero-heading"
            className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[52px] lg:text-[58px]"
          >
            Trade In. Upgrade.
            <br />
            <span className="text-white/90">Save More.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[15px] leading-7 text-white/70"
          >
            Turn your old appliance into value and upgrade to a professionally
            renewed premium appliance—without the hassle of classifieds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <CtaButton href={TRADE_IN_LINKS.valuation} size="lg">
              Get Free Valuation
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <a
              href={TRADE_IN_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5",
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
              "relative overflow-hidden rounded-[32px]",
              "border border-white/10 bg-black",
              "shadow-[0_40px_120px_rgba(0,0,0,0.75)]",
            )}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={HeroImage}
                alt="Premium appliance trade-in"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
                quality={82}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.2))]" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
              <p className="text-[11px] font-medium tracking-[0.18em] text-white/50">
                PREMIUM EXCHANGE
              </p>
              <p className="mt-1 text-[14px] font-semibold text-white">
                Fair value. Professional pickup. Upgrade with confidence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
