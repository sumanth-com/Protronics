"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Headset,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { IMAGE_QUALITY, HERO_REVIEW_AVATARS } from "@/lib/images";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export type Slide = {
  imageSrc: string | StaticImageData;
};

export type HeroSlideProps = {
  slide: Slide;
  priority?: boolean;
};

export default function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <div className="h-full">
      <div className="relative h-full overflow-hidden">
        {/* Full-width cinematic slide image */}
        <motion.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.imageSrc}
            alt="Premium appliance lifestyle"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="object-cover"
            quality={IMAGE_QUALITY.hero}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </motion.div>

        {/* Cinematic overlays (keeps text readable, premium mood) */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.78),rgba(0,0,0,0.52)_38%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0)_80%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.62),rgba(0,0,0,0.10)_55%,rgba(0,0,0,0))]" />
{/* Content overlay */}
        <div className="relative h-full px-5 py-6 md:px-8 md:py-8 lg:px-10">
          <div className="grid h-full items-center md:grid-cols-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="md:col-span-6 lg:col-span-5"
            >
              <motion.div
                variants={fadeUp}
                className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] text-white/70 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                Refurbished. Restored. Reliable.
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className={cn(
                  "mt-5 text-[36px] font-semibold leading-[1.05] tracking-tight text-white",
                  "sm:text-[48px]",
                )}
              >
                Premium Appliances.
                <br />
                <span className="text-white/90">Unbeatable Value.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[14px] leading-7 text-white/70 sm:text-[15px]"
              >
                Professionally refurbished appliances with 100+ quality checks,
                warranty coverage, and premium support—built for modern homes.
              </motion.p>

              {/* Trust mini-features */}
              <motion.div
                variants={fadeUp}
                className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {[
                  { icon: BadgeCheck, t: "100+ Quality Checks" },
                  { icon: ShieldCheck, t: "1‑Year Warranty" },
                  { icon: Truck, t: "Fast Delivery" },
                  { icon: Headset, t: "Expert Support" },
                ].map((x) => {
                  const Icon = x.icon;
                  return (
                    <div
                      key={x.t}
                      className="hero-feature-card flex items-start gap-2 rounded-2xl border border-white/10 bg-black/35 px-3 py-3 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl"
                    >
                      <Icon className="hero-feature-icon mt-[2px] h-4 w-4 text-white/85" strokeWidth={1.75} />
                      <div className="text-[12px] leading-5 text-white/70">
                        {x.t}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* CTAs — no entrance delay so clicks feel instant */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CtaButton href="#shop" size="lg" fullWidth className="sm:w-auto">
                  Explore Collection →
                </CtaButton>
                <CtaButton
                  href={BUSINESS.whatsappMessage}
                  size="lg"
                  fullWidth
                  external
                  className="sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4 text-black/80" />
                  Chat on WhatsApp
                </CtaButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* rating pill (bottom-right, reference-style) */}
        <div className="absolute bottom-4 right-4">
          <div className="hero-rating-pill flex items-center gap-3 rounded-2xl border border-white/10 bg-black/55 px-3 py-2.5 supports-[backdrop-filter]:bg-black/35 supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.70)]">
            <div className="flex -space-x-2">
              {HERO_REVIEW_AVATARS.map((avatar) => (
                <div
                  key={avatar.src}
                  className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.06] ring-1 ring-black/25"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="28px"
                    className="object-cover"
                    quality={IMAGE_QUALITY.card}
                  />
                </div>
              ))}
            </div>
            <div className="text-[12px] font-semibold text-white/85">
              4.9/5
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-white/90"
                  fill="currentColor"
                />
              ))}
            </div>
            <div className="hidden text-[12px] text-white/55 sm:block">
              500+ happy customers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

