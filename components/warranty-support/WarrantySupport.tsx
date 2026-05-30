"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ClipboardCheck,
  Headset,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { canRunGsapScroll, gsapScroller } from "@/lib/gsapScroll";
import { IMAGE_QUALITY, SECTION_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import SupportFeature, {
  type SupportFeatureData,
} from "@/components/warranty-support/SupportFeature";
import WarrantyHighlights from "@/components/warranty-support/WarrantyHighlights";
import SupportCTA from "@/components/warranty-support/SupportCTA";

gsap.registerPlugin(ScrollTrigger);

export default function WarrantySupport() {
  const visualRef = useRef<HTMLDivElement | null>(null);

  const features = useMemo<SupportFeatureData[]>(
    () => [
      {
        icon: ShieldCheck,
        title: "1-Year Warranty",
        description:
          "Service-backed coverage designed to remove doubt and protect your purchase.",
      },
      {
        icon: Wrench,
        title: "Delivery & Installation",
        description:
          "Careful handling and setup—so your appliance works perfectly from day one.",
      },
      {
        icon: Headset,
        title: "Dedicated Support Team",
        description:
          "Responsive, human help—before and after purchase—with clear guidance.",
      },
      {
        icon: BadgeCheck,
        title: "Quality Assurance",
        description:
          "Verified standards across safety, hygiene, and finish—checked before delivery.",
      },
      {
        icon: ClipboardCheck,
        title: "Performance Certified",
        description:
          "Measured performance checks so refurbished feels engineered—not uncertain.",
      },
      {
        icon: Sparkles,
        title: "Easy Assistance Process",
        description:
          "Simple support flow with fast resolution—no runaround, no confusion.",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!canRunGsapScroll()) return;

    const visual = visualRef.current;
    if (!visual) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visual,
        { y: -8 },
        {
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            scroller: gsapScroller(),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, visual);

    return () => ctx.revert();
  }, []);

  return (
    <section id="warranty" className="theme-section-c relative overflow-hidden bg-black">
      <div className="section-seam-fade pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className="mx-auto flex max-w-3xl flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-center text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            WARRANTY + SUPPORT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "type-section-title mt-3 text-center font-semibold tracking-tight text-white",
              "text-[34px] leading-[1.06]",
              "sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Warranty That Builds Confidence.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            If something ever feels off, you’re covered. Premium support is part
            of the product—designed to make refurbished feel dependable.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:items-stretch md:gap-10"
        >
          {/* Left: content */}
          <motion.div variants={fadeUp} className="flex h-full flex-col md:col-span-6">
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {features.map((f) => (
                <SupportFeature key={f.title} data={f} />
              ))}
            </div>

            <SupportCTA className="mt-7 shrink-0" supportHref="/contact" />
          </motion.div>

          {/* Right: premium visual + reassurance */}
          <motion.div variants={fadeUp} className="flex h-full flex-col md:col-span-6">
            <div
              className={cn(
                "warranty-visual-card relative min-h-[240px] flex-1 overflow-hidden rounded-[28px]",
                "border border-white/12 bg-white/[0.05]",
                "shadow-[0_35px_110px_rgba(0,0,0,0.65)]",
              )}
            >
              <div ref={visualRef} className="absolute inset-0">
                <Image
                  src={SECTION_IMAGES.warrantySupport}
                  alt="Technician providing premium appliance warranty support"
                  fill
                  sizes="(max-width: 768px) 92vw, 50vw"
                  className="warranty-visual-image object-cover object-center"
                  quality={IMAGE_QUALITY.section}
                  priority
                />
              </div>
              <div className="warranty-visual-mask pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),rgba(0,0,0,0.35)_52%,rgba(0,0,0,0.05)_72%,rgba(0,0,0,0))]" />
              <div className="relative flex min-h-[240px] flex-col justify-end p-6 sm:p-7">
                <div className="warranty-visual-label text-[12px] font-medium tracking-[0.22em] text-white/55">
                  ALWAYS INCLUDED
                </div>
                <div className="warranty-visual-title mt-3 text-[18px] font-semibold leading-snug tracking-tight text-white sm:text-[20px]">
                  Premium Support.
                  <br />
                  Always Included.
                </div>
                <div className="theme-accent-line warranty-visual-divider mt-3 w-10" />
                <div className="warranty-visual-body mt-4 text-[12.5px] leading-6 text-white/75">
                  Clear communication, careful handling, and warranty-backed
                  service—so your purchase feels secure for the long term.
                </div>
              </div>
            </div>

            <WarrantyHighlights className="mt-4 shrink-0" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

