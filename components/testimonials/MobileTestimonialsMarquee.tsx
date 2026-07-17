"use client";

import { Star } from "lucide-react";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import type { Testimonial } from "@/components/testimonials/TestimonialCard";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function TestimonialGridCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <article className="mobile-testimonial-card">
      <div className="flex items-center gap-2.5">
        <span className="mobile-testimonial-avatar" aria-hidden>
          {initials(testimonial.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="mobile-testimonial-name">{testimonial.name}</p>
          {testimonial.location ? (
            <p className="mobile-testimonial-location">{testimonial.location}</p>
          ) : null}
        </div>
      </div>

      <div className="mobile-testimonial-stars" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3 w-3"
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            aria-hidden
          />
        ))}
      </div>

      <p className="mobile-testimonial-quote">{testimonial.quote}</p>
    </article>
  );
}

export default function MobileTestimonialsMarquee() {
  const featured = CUSTOMER_TESTIMONIALS.slice(0, 6);

  return (
    <section
      id="reviews"
      className="mobile-testimonials-marquee lg:hidden"
      aria-label="Customer testimonials"
    >
      <div className="mobile-section">
        <div className="mobile-section-head mobile-testimonials-head">
          <div>
            <p className="mobile-section-eyebrow">Testimonials</p>
            <h2 className="mobile-section-title">Real feedback from real homes</h2>
          </div>
        </div>

        <div
          className={cn(
            "mobile-testimonial-grid",
            "mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 min-[400px]:gap-3.5",
          )}
        >
          {featured.map((item) => (
            <TestimonialGridCard key={`${item.name}-${item.quote.slice(0, 16)}`} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
