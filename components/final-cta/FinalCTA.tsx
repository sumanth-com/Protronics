"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import CTAButtons from "@/components/final-cta/CTAButtons";
import BackgroundEffects from "@/components/final-cta/BackgroundEffects";
import CinematicOverlay from "@/components/final-cta/CinematicOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const bg = bgRef.current;
    if (!orb || !bg) return;

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
        bg,
        { y: -10 },
        {
          y: 14,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, bg);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0c0a]">
      {/* seamless continuation */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <CinematicOverlay
        ref={bgRef}
        src="/final/final-cta.jpg"
        alt="Premium modern kitchen lifestyle background"
      />

      <BackgroundEffects ref={orbRef} />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20">
        <div
          className={cn(
            "mx-auto max-w-4xl rounded-[34px]",
            "border border-white/12 bg-white/[0.05]",
            "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
            "shadow-[0_40px_140px_rgba(0,0,0,0.70)]",
            "px-6 py-10 sm:px-10 sm:py-12",
          )}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[12px] font-medium tracking-[0.22em] text-white/55"
            >
              FINAL CALL
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className={cn(
                "mt-3 font-semibold tracking-tight text-white",
                "text-[40px] leading-[1.04]",
                "sm:text-[56px] sm:leading-[1.02]",
              )}
            >
              Modern Living Starts Here.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-[14px] leading-7 text-white/70 sm:text-[15px]"
            >
              Professionally restored appliances designed for modern homes—backed
              by trust, warranty, and premium care.
            </motion.p>

            <motion.div variants={fadeUp}>
              <CTAButtons />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className={cn(
                "mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3",
              )}
            >
              {[
                { k: "100+ Point", v: "Testing & verification" },
                { k: "1‑Year", v: "Warranty included" },
                { k: "White‑glove", v: "Delivery & setup" },
              ].map((x) => (
                <div
                  key={x.k}
                  className={cn(
                    "rounded-2xl border border-white/12 bg-white/[0.04]",
                    "px-4 py-4",
                  )}
                >
                  <div className="text-[13px] font-semibold text-white">
                    {x.k}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-6 text-white/70">
                    {x.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

