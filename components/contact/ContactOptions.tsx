"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  Video,
  type LucideIcon,
} from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, contactGlass } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Option = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
};

const options: Option[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "Fastest way to get answers—share photos, models, and budget. Our team replies personally.",
    cta: "Chat on WhatsApp",
    href: BUSINESS.whatsappMessage,
    external: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description:
      "Speak directly with a Protronics advisor for sizing, delivery slots, and same-day guidance.",
    cta: "Call Now",
    href: BUSINESS.phoneHref,
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "Detailed inquiries, invoices, or warranty questions—we respond within one business day.",
    cta: "Send Email",
    href: BUSINESS.emailHref,
    external: true,
  },
  {
    icon: Video,
    title: "Book Video Demo",
    description:
      "See the finish, hear the compressor, and review test reports live—before you decide.",
    cta: "Book Demo",
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={opt.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative overflow-hidden",
                    contactGlass,
                    "flex flex-col p-6",
                  )}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] ring-1 ring-white/10 transition-colors group-hover:border-white/25 group-hover:bg-white/[0.06]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-white">
                      {opt.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-6 text-white/60">
                      {opt.description}
                    </p>
                    <CtaButton
                      href={opt.href}
                      external={opt.external}
                      size="sm"
                      fullWidth
                      className="mt-6"
                    >
                      {opt.cta}
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
