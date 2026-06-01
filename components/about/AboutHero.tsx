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

const navLinkClass = cn(
  "about-hero-nav-link rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1",
  "text-[11px] font-medium text-white/75 sm:px-3.5 sm:py-1.5 sm:text-[12px]",
);

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="about-hero about-hero-fullscreen theme-section-a relative overflow-hidden bg-black"
    >
      <AboutAmbient variant="hero" />

      <div
        className={cn(
          "about-hero-inner relative mx-auto w-full max-w-7xl",
          "flex flex-col px-4 sm:px-6",
          "md:grid md:min-h-[calc(100svh-64px)] md:grid-cols-12 md:items-center md:gap-10 md:py-16",
        )}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="about-hero-media-wrap order-1 md:order-2 md:col-span-6"
        >
          <motion.div
            variants={fadeUp}
            className="about-hero-card theme-preserve-dark relative overflow-hidden"
          >
            <div className="about-hero-media relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 md:aspect-[16/10]">
              <Image
                src={HeroImage}
                alt="Protronics showroom — refurbished refrigerators on display"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="about-hero-image object-cover object-center"
                quality={92}
              />
            </div>
            <div className="about-hero-pills-bar border-t border-white/10 bg-neutral-950 px-3 py-3 md:px-6 md:py-4">
              <div className="about-hero-pills flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                {HERO_TAGS.map((tag) => (
                  <span key={tag} className="about-hero-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="about-hero-copy about-hero-copy-panel order-2 md:order-1 md:col-span-6"
        >
          <motion.p
            variants={fadeUp}
            className="about-hero-eyebrow text-[11px] font-medium tracking-[0.18em] text-white/55 md:text-[12px] md:tracking-[0.22em]"
          >
            REFURBISHED · CERTIFIED · WARRANTY BACKED
          </motion.p>

          <motion.h1
            id="about-hero-heading"
            variants={fadeUp}
            className={cn(
              "about-hero-title type-page-hero font-semibold tracking-tight text-white",
              "text-[26px] leading-[1.1] md:mt-4 md:text-[52px] md:leading-[1.06] lg:text-[58px]",
            )}
          >
            Premium Appliances.
            <br />
            Professionally Renewed.
          </motion.h1>

          <div className="about-hero-accent-line theme-accent-line mx-auto w-14 md:mx-0 md:mt-4" />

          <motion.p
            variants={fadeUp}
            className="about-hero-desc mx-auto max-w-md text-[13px] leading-relaxed text-white/70 md:mx-0 md:mt-5 md:max-w-xl md:text-[15px] md:leading-7"
          >
            Protronics brings high-quality refurbished appliances back to life through rigorous
            testing, restoration, and certification.
          </motion.p>

          <motion.nav
            variants={fadeUp}
            aria-label="About page sections"
            className="about-hero-nav flex flex-wrap justify-center gap-1.5 md:mt-6 md:justify-start md:gap-2"
          >
            {HERO_NAV.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
          </motion.nav>

          <motion.div
            variants={fadeUp}
            className="about-hero-ctas grid w-full max-w-sm grid-cols-2 gap-2 md:mt-8 md:flex md:max-w-none md:flex-row md:items-center md:justify-start"
          >
            <CtaButton
              href={ABOUT_LINKS.collection}
              size="md"
              fullWidth
              className="min-h-[48px] text-[12px] sm:w-auto sm:text-[13px]"
            >
              <span className="truncate">Explore</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            </CtaButton>

            <CtaButton
              href={ABOUT_LINKS.whatsapp}
              external
              size="md"
              fullWidth
              className="min-h-[48px] text-[12px] sm:w-auto sm:text-[13px]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="truncate">WhatsApp</span>
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
