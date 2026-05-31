"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import AboutAmbient from "@/components/about/AboutAmbient";
import CtaButton from "@/components/ui/CtaButton";
import HeroImage from "@/assets/About.webp";
import { ABOUT_LINKS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const HERO_TAGS = [
  "100+ Quality Checks",
  "Deep Sanitized",
  "1-Year Warranty",
] as const;

const HERO_NAV = [
  { label: "Our mission", href: "#story" },
  { label: "How we work", href: "#process" },
  { label: "Warranty", href: "#warranty" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="theme-section-a relative overflow-hidden bg-black"
    >
      <AboutAmbient variant="hero" />

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
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            REFURBISHED · CERTIFIED · WARRANTY BACKED
          </motion.p>

          <motion.h1
            id="about-hero-heading"
            variants={fadeUp}
            className={cn(
              "type-page-hero mt-4 text-[40px] font-semibold tracking-tight text-white",
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

          <motion.nav
            variants={fadeUp}
            aria-label="About page sections"
            className="mt-6 flex flex-wrap gap-2"
          >
            {HERO_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5",
                  "text-[12px] font-medium text-white/75 transition-colors",
                  "hover:border-white/22 hover:bg-white/[0.08] hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                "transition-colors duration-150 hover:bg-white/[0.09] active:bg-white/[0.06]",
              )}
            >
              WhatsApp Inquiry
              <WhatsAppIcon className="h-4 w-4 text-white" />
            </a>
          </div>
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
              "theme-preserve-dark relative overflow-hidden rounded-[32px]",
              "border border-white/12 bg-black",
              "shadow-[0_40px_140px_rgba(0,0,0,0.55)]",
            )}
          >
            <div className="about-hero-media relative aspect-[4/3] w-full overflow-hidden bg-black sm:aspect-[16/10]">
              <Image
                src={HeroImage}
                alt="Protronics showroom — refurbished refrigerators on display"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                quality={90}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.45)_50%,transparent_100%)]"
                aria-hidden
              />

              <div className="about-hero-pills absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-4 pt-10 sm:px-6 sm:pb-5 sm:pt-12">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                  {HERO_TAGS.map((tag) => (
                    <span key={tag} className="about-hero-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
