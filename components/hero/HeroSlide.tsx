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
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

export type Slide = {
  imageSrc: string | StaticImageData;
};

export type HeroSlideProps = {
  slide: Slide;
};

export default function HeroSlide({ slide }: HeroSlideProps) {
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
            sizes="100vw"
            className="object-cover"
            quality={92}
            priority={false}
          />
        </motion.div>

        {/* Cinematic overlays (keeps text readable, premium mood) */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.78),rgba(0,0,0,0.52)_38%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0)_80%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.62),rgba(0,0,0,0.10)_55%,rgba(0,0,0,0))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_65%_35%,rgba(57,255,136,0.12),transparent_60%)]" />

        {/* Content overlay */}
        <div className="relative h-full px-6 py-7 md:px-10 md:py-9">
          <div className="grid h-full items-center md:grid-cols-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="md:col-span-6 lg:col-span-5"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] text-white/70 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#39ff88]" />
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
                <span className="text-[#39ff88]">Unbeatable Value.</span>
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
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
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
                      className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/35 px-3 py-3 supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl"
                    >
                      <Icon className="mt-[2px] h-4 w-4 text-[#39ff88]/90" />
                      <div className="text-[12px] leading-5 text-white/70">
                        {x.t}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <a href="#shop" className="w-full sm:w-auto">
                  <MagneticButton
                    className={cn(
                      "w-full rounded-full px-6 py-3.5",
                      "bg-[#39ff88] text-black",
                      "text-[12px] font-semibold tracking-wide",
                      "shadow-[0_24px_70px_rgba(57,255,136,0.20)]",
                    )}
                  >
                    Explore Collection →
                  </MagneticButton>
                </a>
                <a href="https://wa.me/" className="w-full sm:w-auto">
                  <MagneticButton
                    className={cn(
                      "w-full rounded-full px-6 py-3.5",
                      "border border-white/12 bg-black/35 text-white",
                      "supports-[backdrop-filter]:bg-black/25 supports-[backdrop-filter]:backdrop-blur-xl",
                      "text-[12px] font-medium tracking-wide",
                      "shadow-[0_24px_70px_rgba(0,0,0,0.70)]",
                    )}
                  >
                    Chat on WhatsApp
                  </MagneticButton>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* rating pill (bottom-right, reference-style) */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/55 px-3 py-2.5 supports-[backdrop-filter]:bg-black/35 supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.70)]">
            <div className="flex -space-x-2">
              {["A", "S", "N"].map((ch) => (
                <div
                  key={ch}
                  className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-semibold text-white/80"
                >
                  {ch}
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
                  className="h-3.5 w-3.5 text-[#39ff88]/90"
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

