"use client";

import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

import CtaButton from "@/components/ui/CtaButton";
import MobileHeroCarousel from "@/components/hero/MobileHeroCarousel";
import TrustMetrics from "@/components/hero/TrustMetrics";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const HERO_DOTS_STYLE = `
  .hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.22);
    transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease;
    display: inline-block;
  }
  .hero-dot-active {
    width: 28px;
    background: rgba(255, 255, 255, 0.88);
  }
  .hero-mobile-swiper,
  .hero-mobile-swiper .swiper-wrapper,
  .hero-mobile-swiper .swiper-slide {
    width: 100% !important;
  }
`;

export default function HeroSlider() {
  const slides = useMemo(() => HERO_SLIDES, []);

  return (
    <section className="hero-section relative overflow-hidden bg-theme-bg">
      {/* Mobile / tablet — banner carousel only */}
      <div className="hero-slider-wrap w-full lg:hidden">
        <div
          className={cn(
            "theme-preserve-dark hero-slider-shell relative overflow-hidden",
            "border border-white/10 bg-black max-lg:rounded-none max-lg:border-x-0",
            "max-lg:shadow-[var(--theme-shadow-sm)]",
          )}
        >
          <MobileHeroCarousel slides={slides} />
        </div>
      </div>

      {/* Desktop — image + copy, trust card under both */}
      <div className="hero-desktop-stack mx-auto hidden w-full max-w-[1320px] px-8 lg:flex lg:flex-col lg:justify-center xl:px-10">
        <div className="hero-desktop-split grid w-full grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] items-stretch gap-8 xl:gap-10">
          <div
            className={cn(
              "theme-preserve-dark hero-desktop-media relative w-full overflow-hidden rounded-3xl",
              "border border-white/10 bg-black",
            )}
          >
            <MobileHeroCarousel slides={slides} className="hero-desktop-carousel" />
          </div>

          <div className="hero-desktop-copy">
            <div className="hero-desktop-copy-top">
              <h1 className="hero-desktop-title">
                <span className="hero-desktop-title-line">Certified refurbished</span>
                <span className="hero-desktop-title-line">refrigerators with warranty</span>
              </h1>

              <p className="hero-desktop-lead">
                Inspected, sanitized, and performance-tested—so you buy with confidence.
              </p>

              <p className="hero-desktop-support">
                In-stock second-hand refrigerators and appliances with 100+ checks, warranty
                cover, and safe delivery across Bengaluru.
              </p>
            </div>

            <div className="hero-desktop-ctas">
              <CtaButton
                href="/shop"
                size="md"
                className="hero-desktop-cta"
                aria-label="Shop certified refurbished refrigerators in Bengaluru"
              >
                Shop Fridges
                <ArrowUpRight className="h-4 w-4 text-black/80" />
              </CtaButton>
              <CtaButton
                href="/contact"
                size="md"
                className="hero-desktop-cta"
                aria-label="Get expert help buying a refurbished refrigerator in Bangalore"
              >
                Get Buying Help
                <ArrowUpRight className="h-4 w-4 text-black/80" />
              </CtaButton>
            </div>
          </div>
        </div>

        <TrustMetrics />
      </div>

      <style jsx global>
        {HERO_DOTS_STYLE}
      </style>
    </section>
  );
}
