"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Video,
  type LucideIcon,
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, contactGlass } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Option = {
  icon?: LucideIcon;
  customIcon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta: string;
  ctaShort: string;
  href: string;
  external?: boolean;
};

const options: Option[] = [
  {
    customIcon: WhatsAppIcon,
    title: "WhatsApp Support",
    description:
      "Fastest way to get answers—share photos, models, and budget. Our team replies personally.",
    cta: "Chat on WhatsApp",
    ctaShort: "WhatsApp",
    href: BUSINESS.whatsappMessage,
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description:
      "Speak directly with a Protronics advisor for sizing, delivery slots, and same-day guidance.",
    cta: "Call Now",
    ctaShort: "Call",
    href: BUSINESS.phoneHref,
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Detailed inquiries, invoices, or warranty questions—we respond within one business day.",
    cta: "Send Email",
    ctaShort: "Email",
    href: BUSINESS.emailHref,
    external: true,
  },
  {
    icon: Video,
    title: "Book Video Demo",
    description:
      "See the finish, hear the compressor, and review test reports live—before you decide.",
    cta: "Book Demo",
    ctaShort: "Demo",
    href: "#contact",
  },
];

export default function ContactOptions() {
  return (
    <section className="relative bg-black py-16 sm:py-20">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <SectionHeader
            eyebrow="REACH US INSTANTLY"
            title="Choose How You'd Like To Connect"
            description="Every channel is staffed by real experts—not bots. Pick what feels right; we'll meet you there."
          />

          <div className="contact-options-grid mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-4">
            {options.map((opt) => {
              const Icon = opt.icon;
              const CustomIcon = opt.customIcon;
              return (
                <motion.div
                  key={opt.title}
                  variants={fadeUp}
                  className={cn(
                    "contact-option-card group relative overflow-hidden",
                    contactGlass,
                    "flex h-full flex-col p-3.5 sm:p-6",
                    "transition-transform duration-150 ease-out hover:-translate-y-1",
                  )}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] ring-1 ring-white/10 transition-colors group-hover:border-white/25 group-hover:bg-white/[0.06] sm:h-11 sm:w-11 sm:rounded-2xl">
                      {CustomIcon ? (
                        <CustomIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      ) : Icon ? (
                        <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-[13px] font-semibold leading-snug tracking-tight text-white sm:mt-5 sm:text-[16px]">
                      {opt.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[11px] leading-4 text-white/60 line-clamp-3 sm:mt-2 sm:text-[13px] sm:leading-6 sm:line-clamp-none">
                      {opt.description}
                    </p>
                    <CtaButton
                      href={opt.href}
                      external={opt.external}
                      size="sm"
                      fullWidth
                      className="contact-option-cta mt-3 min-h-[34px] px-2 py-2 text-[11px] sm:mt-6 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[13px]"
                    >
                      <span className="sm:hidden">{opt.ctaShort}</span>
                      <span className="hidden sm:inline">{opt.cta}</span>
                    </CtaButton>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
