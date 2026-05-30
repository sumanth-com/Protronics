"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import TrustMetrics from "@/components/testimonials/TrustMetrics";
import TestimonialCard, { type Testimonial } from "@/components/testimonials/TestimonialCard";
import ReviewCarousel from "@/components/testimonials/ReviewCarousel";

export default function TestimonialsSection() {
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
      {
        quote:
          "Delivery was on time and the team walked us through every check. The fridge runs whisper-quiet—exactly what we wanted.",
        name: "Rahul D.",
        location: "Electronic City, Bengaluru",
        rating: 4.9,
        verified: true,
      },
      {
        quote:
          "Pricing was fair and the quality checks were explained clearly. It genuinely feels like a premium purchase.",
        name: "Ananya V.",
        location: "Marathahalli, Bengaluru",
        rating: 5.0,
        verified: true,
      },
      {
        quote:
          "We compared multiple stores—Protronics was the only one that felt engineered, not rushed. Highly recommend.",
        name: "Karthik M.",
        location: "BTM Layout, Bengaluru",
        rating: 4.8,
        verified: true,
      },
    ],
    [],
  );

  return (
    <section id="reviews" className="theme-section-a relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

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

        {/* Desktop — two rows (feature left + 3 compact right each) */}
        <div className="mt-10 hidden flex-col gap-5 md:flex">
          {/* Row 1 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="grid grid-cols-12 items-stretch gap-5"
          >
            <motion.div variants={fadeUp} className="col-span-7 min-h-0">
              <TestimonialCard testimonial={testimonials[0]!} className="h-full" />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="testimonial-compact-stack col-span-5 flex min-h-0 flex-col gap-3"
            >
              <TestimonialCard testimonial={testimonials[1]!} size="compact" />
              <TestimonialCard testimonial={testimonials[3]!} size="compact" />
              <TestimonialCard testimonial={testimonials[4]!} size="compact" />
            </motion.div>
          </motion.div>

          {/* Row 2 — compact cards left, feature card right */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="grid grid-cols-12 items-stretch gap-5"
          >
            <motion.div
              variants={fadeUp}
              className="testimonial-compact-stack col-span-5 flex min-h-0 flex-col gap-3"
            >
              <TestimonialCard testimonial={testimonials[5]!} size="compact" />
              <TestimonialCard testimonial={testimonials[6]!} size="compact" />
              <TestimonialCard testimonial={testimonials[7]!} size="compact" />
            </motion.div>
            <motion.div variants={fadeUp} className="col-span-7 min-h-0">
              <TestimonialCard testimonial={testimonials[2]!} className="h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

