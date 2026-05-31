"use client";

import { Star } from "lucide-react";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import type { Testimonial } from "@/components/testimonials/TestimonialCard";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function MarqueeCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <article className="mobile-testimonial-card shrink-0">
      <div className="flex items-center gap-2">
        <span className="mobile-testimonial-avatar" aria-hidden>
          {initials(testimonial.name)}
        </span>
        <div className="min-w-0">
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

function MarqueeRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "right" | "left";
}) {
  const loop = [...items, ...items];

  return (
    <div
      className="mobile-testimonial-marquee-row overflow-hidden"
      aria-hidden={false}
    >
      <div
        className={
          direction === "right"
            ? "mobile-testimonial-track mobile-testimonial-track--right"
            : "mobile-testimonial-track mobile-testimonial-track--left"
        }
      >
        {loop.map((item, i) => (
          <MarqueeCard key={`${item.name}-${i}`} testimonial={item} />
        ))}
      </div>
    </div>
  );
}

export default function MobileTestimonialsMarquee() {
  const rowOne = CUSTOMER_TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const rowTwo = CUSTOMER_TESTIMONIALS.filter((_, i) => i % 2 === 1);

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

        <div className="mobile-testimonial-marquee-stack">
          <MarqueeRow items={rowOne} direction="right" />
          <MarqueeRow items={rowTwo} direction="left" />
        </div>
      </div>
    </section>
  );
}
