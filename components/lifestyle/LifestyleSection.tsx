"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import LifestyleContent from "@/components/lifestyle/LifestyleContent";
import LifestyleImage from "@/components/lifestyle/LifestyleImage";

gsap.registerPlugin(ScrollTrigger);

export default function LifestyleSection() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glow,
        { y: -10 },
        {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: glow,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, glow);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* seamless continuation */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_680px_at_50%_-10%,rgba(255,90,85,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(960px_700px_at_20%_50%,rgba(255,255,255,0.06),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <div
          ref={glowRef}
          className="absolute -right-40 top-24 h-[560px] w-[560px] rounded-full bg-[#ff5a55]/[0.08] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className={cn(
            "grid items-center gap-10",
            "md:grid-cols-12 md:gap-10",
          )}
        >
          {/* Content first on desktop (cinematic editorial flow) */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <LifestyleContent />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="md:col-span-7"
          >
            <LifestyleImage
              src="/lifestyle/lifestyle-1.jpg"
              alt="Modern premium kitchen interior"
              className="aspect-[5/4] md:aspect-[16/10]"
            />

            <div className="mt-4 hidden grid-cols-2 gap-4 md:grid">
              <LifestyleImage
                src="/lifestyle/lifestyle-2.jpg"
                alt="Warm luxury home interior"
                className="aspect-[4/3]"
              />
              <div
                className={cn(
                  "relative overflow-hidden rounded-[26px]",
                  "border border-white/12 bg-white/[0.05]",
                  "shadow-[0_35px_110px_rgba(0,0,0,0.65)]",
                  "px-6 py-6",
                )}
              >
                <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
                  THE FEELING
                </div>
                <div className="mt-3 text-[18px] font-semibold leading-snug tracking-tight text-white">
                  A calmer kitchen.
                  <br />
                  A smarter home.
                </div>
                <div className="mt-3 h-[2px] w-10 rounded-full bg-[#ff5a55]/70" />
                <div className="mt-4 text-[12.5px] leading-6 text-white/70">
                  Premium appliances shouldn’t be out of reach. Get the modern look
                  and confident performance—restored with professional standards.
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100 bg-[radial-gradient(680px_260px_at_15%_0%,rgba(255,90,85,0.22),transparent_58%),radial-gradient(520px_240px_at_80%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

