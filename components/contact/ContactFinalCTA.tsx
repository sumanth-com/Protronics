"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import ContactAmbient from "@/components/contact/ContactAmbient";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, contactGlass } from "@/lib/contact";
import { cn } from "@/lib/utils";

export default function ContactFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />
      <ContactAmbient variant="cta" />

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
            className="text-[12px] font-medium tracking-[0.22em] text-white/55"
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
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Inquiry
            </CtaButton>
            <CtaButton href={BUSINESS.phoneHref} size="lg" fullWidth className="sm:w-auto">
              <Phone className="h-4 w-4" />
              Call Now
            </CtaButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
