"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import TrustMetrics from "@/components/testimonials/TrustMetrics";
import TestimonialCard, { type Testimonial } from "@/components/testimonials/TestimonialCard";
import ReviewCarousel from "@/components/testimonials/ReviewCarousel";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  const metrics = useMemo(
    () => [
      { value: "500+", label: "Happy Customers", sublabel: "Across the city" },
      { value: "1000+", label: "Appliances Delivered", sublabel: "Handled with care" },
      { value: "4.9", label: "Average Rating", sublabel: "Verified feedback" },
      { value: "1-Year", label: "Warranty Included", sublabel: "Service-backed" },
    ],
    [],
  );

  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        quote:
          "Honestly felt like buying a brand‑new refrigerator. Clean finish, quiet operation, and the delivery team handled everything professionally.",
        name: "Akhila R.",
        location: "Indiranagar, Bengaluru",
        rating: 4.9,
        verified: true,
        homeImageSrc: "/testimonials/home-1.jpg",
      },
      {
        quote:
          "The sanitization was next‑level—no smell, no doubts. The appliance looks premium in our kitchen and the warranty gave us complete confidence.",
        name: "Sandeep K.",
        location: "Koramangala, Bengaluru",
        rating: 5.0,
        verified: true,
      },
      {
        quote:
          "Transparent process, timely updates, and the unit performs flawlessly. This is not ‘used’—it feels professionally restored.",
        name: "Nandini S.",
        location: "HSR Layout, Bengaluru",
        rating: 4.8,
        verified: true,
        homeImageSrc: "/testimonials/home-2.jpg",
      },
      {
        quote:
          "Setup was smooth and the refrigerator looked spotless. We saved a lot without compromising the premium feel.",
        name: "Vikram P.",
        location: "Whitefield, Bengaluru",
        rating: 4.9,
        verified: true,
      },
      {
        quote:
          "Support was responsive and confident. They answered everything like an engineering team—not a random reseller.",
        name: "Meghana T.",
        location: "Jayanagar, Bengaluru",
        rating: 5.0,
        verified: true,
      },
    ],
    [],
  );

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
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_680px_at_50%_-10%,rgba(255,90,85,0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(960px_700px_at_25%_55%,rgba(255,255,255,0.06),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <div
          ref={glowRef}
          className="absolute left-[-160px] top-16 h-[560px] w-[560px] rounded-full bg-[#ff5a55]/[0.08] blur-3xl"
        />
      </div>

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
            TRUSTED BY MODERN HOMES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "mt-3 text-center font-semibold tracking-tight text-white",
              "text-[34px] leading-[1.06]",
              "sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Real Experiences. Real Confidence.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            A premium system is only real when customers feel it at home—clean,
            verified, and delivered with confidence.
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <TrustMetrics metrics={metrics} />
        </div>

        {/* Mobile carousel (swipeable, snap) */}
        <div className="mt-10 sm:mt-12">
          <ReviewCarousel testimonials={testimonials} />
        </div>

        {/* Desktop staggered grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
          className="mt-10 hidden grid-cols-12 gap-5 md:grid"
        >
          {/* Left feature story */}
          <motion.div variants={fadeUp} className="col-span-7">
            <TestimonialCard testimonial={testimonials[0]!} />
          </motion.div>

          {/* Right column stack (fills the “empty space” with more proof) */}
          <motion.div
            variants={fadeUp}
            className="col-span-5 grid content-start gap-5"
          >
            <TestimonialCard testimonial={testimonials[1]!} />
            <TestimonialCard testimonial={testimonials[3]!} />
          </motion.div>

          {/* Second row: balanced pair */}
          <motion.div variants={fadeUp} className="col-span-5">
            <TestimonialCard testimonial={testimonials[2]!} />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-7">
            <TestimonialCard testimonial={testimonials[4]!} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

