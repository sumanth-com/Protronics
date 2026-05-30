"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ClipboardCheck,
  Headset,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import FeatureCard from "@/components/why-protronics/FeatureCard";
import SectionHeading from "@/components/why-protronics/SectionHeading";
import { fadeUp, stagger } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function WhyProtronics() {
  const connectorRef = useRef<HTMLDivElement | null>(null);

  const features = useMemo(
    () => [
      {
        icon: ClipboardCheck,
        title: "100+ Point Testing",
        description:
          "Precision-checked across cooling, seals, sensors, and real-world performance.",
      },
      {
        icon: Sparkles,
        title: "Deep Sanitization",
        description:
          "Professional-grade cleaning and deodorization—inside, outside, and airflow paths.",
      },
      {
        icon: ShieldCheck,
        title: "1-Year Warranty",
        description:
          "Coverage that matches confidence. Service-backed for peace of mind.",
      },
      {
        icon: Truck,
        title: "Delivery & Setup",
        description:
          "White-glove handling with careful installation so it arrives ready to live in.",
      },
      {
        icon: BadgeCheck,
        title: "Verified Appliances",
        description:
          "Authenticity and model verification with documented inspection standards.",
      },
      {
        icon: PackageCheck,
        title: "Premium Restoration",
        description:
          "Cosmetic refinement and component validation—restored to feel genuinely premium.",
      },
      {
        icon: Leaf,
        title: "Energy Efficient",
        description:
          "Efficiency-checked to help reduce long-term power costs without sacrificing performance.",
      },
      {
        icon: Headset,
        title: "Dedicated Support",
        description:
          "Responsive, human support before and after purchase—when you need it most.",
      },
    ],
    [],
  );

  useEffect(() => {
    const connector = connectorRef.current;
    if (!connector) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        connector,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: "center",
          ease: "power2.out",
          duration: 1.4,
          scrollTrigger: {
            trigger: connector,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, connector);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <SectionHeading
          eyebrow="Why Customers Choose Us"
          title="Engineered for Trust."
          description="Rigorously restored appliances with premium standards—designed to remove doubt and make refurbished feel first‑class."
        />

        <div className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block">
            <div
              ref={connectorRef}
              className="mx-auto h-px w-[92%] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.14),rgba(255,255,255,0.14),transparent)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
            className="hidden items-stretch grid-cols-2 gap-4 md:grid lg:grid-cols-4 lg:gap-5"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="h-full lg:col-span-1">
                <FeatureCard icon={f.icon} title={f.title} description={f.description} />
              </motion.div>
            ))}
          </motion.div>

          <div className="md:hidden">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
              className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex snap-x snap-mandatory gap-4">
                {features.map((f) => (
                  <motion.div key={f.title} variants={fadeUp} className="w-[86%] shrink-0 snap-start">
                    <FeatureCard icon={f.icon} title={f.title} description={f.description} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
