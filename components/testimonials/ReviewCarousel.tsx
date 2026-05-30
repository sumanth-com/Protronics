"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import TestimonialCard, { type Testimonial } from "@/components/testimonials/TestimonialCard";

export type ReviewCarouselProps = {
  testimonials: Testimonial[];
};

export default function ReviewCarousel({ testimonials }: ReviewCarouselProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
      data-lenis-prevent
    >
      <div className="flex snap-x snap-mandatory gap-4">
        {testimonials.map((t) => (
          <motion.div
            key={t.name + t.quote.slice(0, 12)}
            variants={fadeUp}
            className="w-[88%] shrink-0 snap-start"
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

