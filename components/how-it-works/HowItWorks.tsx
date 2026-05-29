"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import ProcessStep, { type ProcessStepData } from "@/components/how-it-works/ProcessStep";
import TimelineConnector from "@/components/how-it-works/TimelineConnector";
import SectionHeading from "@/components/how-it-works/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressXRef = useRef<HTMLDivElement | null>(null);
  const progressYRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const steps = useMemo<ProcessStepData[]>(
    () => [
      {
        step: "01",
        icon: BadgeCheck,
        title: "Source Premium Appliances",
        description:
          "We select high-quality units with strong fundamentals—then verify model authenticity and baseline performance.",
      },
      {
        step: "02",
        icon: ShieldCheck,
        title: "100+ Point Inspection",
        description:
          "Cooling, seals, sensors, compressor response, and safety checks—measured against standardized benchmarks.",
      },
      {
        step: "03",
        icon: Sparkles,
        title: "Deep Sanitization & Restoration",
        description:
          "Professional-grade sanitization plus precision restoration so the appliance looks, feels, and performs premium.",
      },
      {
        step: "04",
        icon: Truck,
        title: "Delivery + Warranty Support",
        description:
          "Careful delivery & setup, then warranty-backed support—so buying refurbished feels effortless and safe.",
      },
    ],
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const px = progressXRef.current;
    const py = progressYRef.current;
    if (!section || !px || !py) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        px,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "0% 50%",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
            onUpdate: (self) => {
              const idx = Math.min(3, Math.max(0, Math.floor(self.progress * 4)));
              setActiveIdx(idx);
            },
          },
        },
      );

      // vertical timeline progress (mobile)
      gsap.fromTo(
        py,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "50% 0%",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      {/* seamless continuation */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <SectionHeading
          eyebrow="How It Works"
          title="From Inspection to Installation."
          description="A premium, engineered workflow that removes uncertainty—so refurbished buying feels simple, modern, and trustworthy."
        />

        <div className="relative mt-10 sm:mt-12">
          <TimelineConnector orientation="horizontal" ref={progressXRef} />
          <TimelineConnector orientation="vertical" ref={progressYRef} />

          {/* Desktop: horizontal timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="hidden grid-cols-4 gap-5 md:grid"
          >
            {steps.map((s, idx) => (
              <motion.div key={s.step} variants={fadeUp} className="h-full">
                <div className="relative">
                  {/* node */}
                  <div className="pointer-events-none absolute -top-5 left-1/2 hidden -translate-x-1/2 md:block">
                    <div className="relative h-3 w-3 rounded-full bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.55)]" />
                  </div>

                  <ProcessStep data={s} active={activeIdx >= idx} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: vertical timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
            className="md:hidden"
          >
            <div className="space-y-4">
              {steps.map((s, idx) => (
                <motion.div key={s.step} variants={fadeUp} className="relative">
                  <div className="pointer-events-none absolute left-[19px] top-8 h-3 w-3 rounded-full bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.55)]" />
                  <div className="pl-12">
                    <ProcessStep data={s} active={activeIdx >= idx} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

