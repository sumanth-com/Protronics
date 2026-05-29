"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import AboutAmbient from "@/components/about/AboutAmbient";
import CtaButton from "@/components/ui/CtaButton";
import { WHY_LINKS, whyGlass } from "@/lib/why";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function WhyFinalCTA() {
  return (
    <section aria-labelledby="why-cta-heading" className="relative overflow-hidden bg-black py-20 sm:py-24">
      <AboutAmbient variant="cta" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className={cn("mx-auto max-w-4xl text-center", whyGlass, "px-6 py-12 sm:px-12 sm:py-14")}
        >
          <motion.h2
            id="why-cta-heading"
            variants={fadeUp}
            className="text-[32px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[44px]"
          >
            Choose Confidence. Choose Protronics.
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-white/70">
            Premium appliances. Verified quality. Warranty included.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CtaButton href={WHY_LINKS.shop} size="lg" fullWidth className="sm:w-auto">
              Shop Collection
              <ArrowUpRight className="h-4 w-4 text-black/80" />
            </CtaButton>
            <a
              href={WHY_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full sm:w-auto",
                "border border-white/15 bg-white/[0.06] px-6 py-3.5",
                "text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.09]",
              )}
            >
              Talk to an Expert
              <WhatsAppIcon className="h-4 w-4 text-white" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
