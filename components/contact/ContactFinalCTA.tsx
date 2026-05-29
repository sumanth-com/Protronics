"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { MessageCircle, Phone } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/ui/CtaButton";
import ContactAmbient from "@/components/contact/ContactAmbient";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, contactGlass } from "@/lib/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFinalCTA() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        orb,
        { y: -10 },
        {
          y: 16,
          ease: "none",
          scrollTrigger: {
            trigger: orb,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, orb);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />
      <ContactAmbient variant="cta" />
      <div
        ref={orbRef}
        className="pointer-events-none absolute right-[-120px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#39ff88]/[0.09] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className={cn("mx-auto max-w-4xl text-center", contactGlass, "px-6 py-12 sm:px-12 sm:py-14")}
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-[0.22em] text-[#39ff88]/80"
          >
            EXPERT GUIDANCE
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-[32px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[44px]"
          >
            Still Unsure? Talk Directly With Our Experts.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/70"
          >
            No pressure—just clarity on the right refrigerator, honest pricing, and
            delivery you can trust.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CtaButton href={BUSINESS.whatsappMessage} external size="lg" fullWidth className="sm:w-auto">
              <MessageCircle className="h-4 w-4 text-black/80" />
              WhatsApp Inquiry
            </CtaButton>
            <CtaButton href={BUSINESS.phoneHref} size="lg" fullWidth className="sm:w-auto">
              <Phone className="h-4 w-4 text-black/80" />
              Call Now
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
