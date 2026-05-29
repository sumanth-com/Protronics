"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutAmbient from "@/components/about/AboutAmbient";
import AboutPromiseCard from "@/components/about/AboutPromiseCard";
import SectionHeader from "@/components/contact/SectionHeader";
import { ABOUT_PROMISE } from "@/lib/about";
import { stagger } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPromise() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: "center",
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: line,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, line);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-labelledby="about-promise-heading"
      className="relative overflow-hidden bg-black py-16 sm:py-20"
    >
      <AboutAmbient />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.08),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          headingId="about-promise-heading"
          eyebrow="THE PROTRONICS PROMISE"
          title="Built for Trust. Verified for You."
          description="Every appliance passes our restoration pipeline—so confidence is built in, not promised later."
          align="center"
        />

        <div
          ref={lineRef}
          className="mx-auto mt-10 h-px w-[min(92%,720px)] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
          style={{ transform: "scaleX(0)" }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {ABOUT_PROMISE.map((item) => (
            <AboutPromiseCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
