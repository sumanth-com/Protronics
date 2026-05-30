"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export default function LegalSupportCard() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="legal-support-section mt-14 sm:mt-16"
      aria-labelledby="legal-support-heading"
    >
      <div className="legal-support-card overflow-hidden rounded-2xl border sm:rounded-[24px]">
        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:p-8">
          <div>
            <p className="text-[11px] font-medium tracking-[0.2em] text-white/50">NEED HELP?</p>
            <h2
              id="legal-support-heading"
              className="mt-2 text-[22px] font-semibold tracking-tight text-white sm:text-[26px]"
            >
              Questions about these policies?
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-7 text-white/65">
              Our team can clarify privacy, orders, warranty, or delivery—reach out anytime
              during business hours.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:min-w-[220px]">
            <a
              href={BUSINESS.whatsappMessage}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "legal-support-action inline-flex items-center justify-center gap-2 rounded-full px-5 py-3",
                "text-[13px] font-semibold transition-colors",
              )}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Support
            </a>
            <Link
              href="/contact"
              className={cn(
                "legal-support-action-secondary inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3",
                "text-[13px] font-semibold transition-colors",
              )}
            >
              <MessageCircle className="h-4 w-4" />
              Contact Page
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </Link>
            <a
              href={BUSINESS.emailHref}
              className="legal-support-email inline-flex items-center justify-center gap-2 py-1 text-[13px] transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
