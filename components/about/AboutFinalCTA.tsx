"use client";

import { ArrowUpRight, Headset } from "lucide-react";
import { motion } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { ABOUT_LINKS } from "@/lib/about";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function AboutFinalCTA() {
  return (
    <section
      aria-labelledby="about-final-cta-heading"
      className="about-page-section theme-section-c relative overflow-hidden bg-black"
    >
      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
          >
            READY TO EXPLORE?
          </motion.p>
          <motion.h2
            id="about-final-cta-heading"
            variants={fadeUp}
            className={cn(
              "type-section-title mt-3 font-semibold tracking-tight text-white",
              "text-[32px] leading-[1.08] sm:text-[40px]",
            )}
          >
            Premium refurbished. Warranty included.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/68">
            Browse certified refrigerators and appliances—or talk to our team if you want help choosing the right model.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <CtaButton href={ABOUT_LINKS.shop} size="lg" fullWidth className="sm:w-auto">
              Shop Collection
              <ArrowUpRight className="h-4 w-4" />
            </CtaButton>
            <CtaButton href={ABOUT_LINKS.support} fullWidth className="sm:w-auto">
              Help Center
              <Headset className="h-4 w-4" />
            </CtaButton>
            <a
              href={ABOUT_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto",
                "border border-white/15 bg-white/[0.06] px-6 py-3.5",
                "text-[13px] font-semibold text-white",
                "transition-colors duration-150 hover:bg-white/[0.09]",
              )}
            >
              WhatsApp
              <WhatsAppIcon className="h-4 w-4 text-white" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
