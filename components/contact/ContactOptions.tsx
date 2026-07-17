"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, type LucideIcon } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Option = {
  icon?: LucideIcon;
  customIcon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  mobileDescription: string;
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
    mobileDescription: "Share photos & models—get quick personal replies.",
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
    mobileDescription: "Talk to an advisor about sizing, delivery & pricing.",
    cta: "Call Now",
    ctaShort: "Call",
    href: BUSINESS.phoneHref,
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Detailed inquiries, invoices, or warranty questions—we respond within one business day.",
    mobileDescription: "Warranty, invoices & details—we reply within one business day.",
    cta: "Send Email",
    ctaShort: "Email",
    href: BUSINESS.emailHref,
    external: true,
  },
];

export default function ContactOptions() {
  return (
    <section className="contact-options-section relative bg-black py-16 sm:py-20">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <SectionHeader
            align="center"
            eyebrow="REACH US INSTANTLY"
            title="Choose How You'd Like To Connect"
            description="Every channel is staffed by real experts—not bots. Pick what feels right; we'll meet you there."
          />

          <div className="contact-options-grid mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
            {options.map((opt) => {
              const Icon = opt.icon;
              const CustomIcon = opt.customIcon;
              return (
                <motion.div
                  key={opt.title}
                  variants={fadeUp}
                  className={cn(
                    "contact-option-card group relative flex h-full flex-col overflow-hidden",
                    "rounded-2xl border border-white/12 bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
                    "transition-[transform,border-color,box-shadow] duration-150 ease-out",
                    "hover:-translate-y-0.5 hover:border-white/20",
                    "sm:rounded-3xl sm:p-6",
                    "p-4",
                  )}
                >
                  <div className="relative flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                    <div
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 sm:rounded-2xl",
                        "border border-white/12 bg-white/[0.06]",
                        "transition-colors group-hover:border-white/22 group-hover:bg-white/[0.08]",
                      )}
                    >
                      {CustomIcon ? (
                        <CustomIcon className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5" />
                      ) : Icon ? (
                        <Icon className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5" strokeWidth={1.75} />
                      ) : null}
                    </div>

                    <h3 className="mt-3 text-[13px] font-semibold leading-snug tracking-tight text-white sm:mt-5 sm:text-[16px]">
                      {opt.title}
                    </h3>

                    <p className="mt-2 flex-1 text-[12px] leading-[1.45] text-white/65 sm:mt-2 sm:text-[13px] sm:leading-6">
                      <span className="sm:hidden">{opt.mobileDescription}</span>
                      <span className="hidden sm:inline">{opt.description}</span>
                    </p>

                    <CtaButton
                      href={opt.href}
                      external={opt.external}
                      size="sm"
                      fullWidth
                      className="contact-option-cta mt-4 min-h-[40px] w-full text-[12px] sm:mt-6 sm:min-h-[44px] sm:text-[13px]"
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
