"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import FAQAccordion from "@/components/faq/FAQAccordion";
import type { FAQ } from "@/components/faq/FAQItem";
import SupportCTA from "@/components/faq/SupportCTA";

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  const faqs = useMemo<FAQ[]>(
    () => [
      {
        question: "Are refurbished appliances reliable?",
        answer:
          "Yes—when the process is engineered. Every unit is inspected, restored, and performance‑checked with professional standards so it feels dependable, not uncertain.",
      },
      {
        question: "What warranty do I get?",
        answer:
          "A 1‑year warranty is included on premium renewed units. You’ll have clear coverage and support—built to remove fear after purchase.",
      },
      {
        question: "Do you provide installation?",
        answer:
          "Yes. Delivery + installation support is available so the appliance is set up correctly and ready to use—without stress.",
      },
      {
        question: "How is the appliance tested?",
        answer:
          "We run 100+ point checks covering cooling performance, seals, sensors, safety, and real‑world reliability—then verify it meets our standards before delivery.",
      },
      {
        question: "Can I return the product?",
        answer:
          "If something isn’t right, we’ll help immediately. Return eligibility depends on the product category and condition—our goal is a smooth, fair resolution.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Typically 24–72 hours within the city depending on your location and scheduling. We confirm a time window and keep communication clear.",
      },
      {
        question: "Are the appliances sanitized?",
        answer:
          "Yes. Deep sanitization and deodorization are part of the process—inside, outside, and airflow paths—so it arrives clean and premium.",
      },
      {
        question: "What makes Protronics different?",
        answer:
          "It’s a system: verified sourcing, rigorous testing, premium restoration, and warranty‑backed support. Refurbished—without compromise.",
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
          className="absolute -left-44 top-20 h-[560px] w-[560px] rounded-full bg-[#ff5a55]/[0.08] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
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
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "mt-3 text-center font-semibold tracking-tight text-white",
              "text-[34px] leading-[1.06]",
              "sm:text-[44px] sm:leading-[1.04]",
            )}
          >
            Clear Answers. Confident Decisions.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-center text-[14px] leading-7 text-white/70 sm:text-[15px]"
          >
            Premium answers, without noise—so you can buy refurbished with total
            confidence.
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <FAQAccordion faqs={faqs} defaultOpenIndex={0} />
          <SupportCTA />
        </div>
      </div>
    </section>
  );
}

