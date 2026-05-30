"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS } from "@/lib/contact";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import FooterLinks from "@/components/footer/FooterLinks";
import FooterNewsletter from "@/components/footer/FooterNewsletter";
import FooterSocials from "@/components/footer/FooterSocials";
import FooterBottom from "@/components/footer/FooterBottom";
import CtaButton from "@/components/ui/CtaButton";
import Logo from "@/assets/Logo.png";

const footerCard = cn(
  "footer-card footer-surface rounded-2xl border border-white/[0.08] sm:rounded-[24px]",
  "bg-black supports-[backdrop-filter]:bg-black supports-[backdrop-filter]:backdrop-blur-xl",
);

export default function Footer() {
  return (
    <footer className="footer-root relative overflow-hidden bg-black">
      <div className="footer-root-inner relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-6 sm:px-6 sm:py-8">
        <FooterNewsletter className={footerCard} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0px" }}
          className="mt-6 grid gap-6 md:grid-cols-12 md:gap-8"
        >
          <motion.div variants={fadeUp} className="md:col-span-4">
            <Link href="/" prefetch className="inline-flex items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src={Logo}
                  alt="Protronics"
                  fill
                  sizes="36px"
                  className="object-contain"
                  quality={IMAGE_QUALITY.logo}
                />
              </div>
              <div className="footer-brand-name text-[15px] font-semibold tracking-tight text-white">
                Protronics
              </div>
            </Link>

            <p className="footer-brand-desc mt-3 max-w-sm text-[13px] leading-6 text-white/65">
              Premium renewed appliances—restored with confidence, backed by warranty.
            </p>

            <FooterSocials className="mt-4" />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-5">
            <FooterLinks />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-3">
            <div className={cn("footer-support-panel", footerCard, "px-4 py-4 md:px-5 md:py-5")}>
              <div className="text-[11px] font-medium tracking-[0.2em] text-white/50">
                SUPPORT
              </div>
              <div className="mt-2 text-[15px] font-semibold tracking-tight text-white">
                Need help choosing?
              </div>
              <p className="mt-1.5 text-[13px] leading-6 text-white/65">
                Talk to an expert for quick, confident guidance.
              </p>

              <div className="mt-4 space-y-2">
                <a
                  href={BUSINESS.phoneHref}
                  className="footer-support-line flex items-center gap-2 text-[13px] text-white/75 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white/50" />
                  {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS.emailHref}
                  className="footer-support-line flex items-center gap-2 text-[13px] text-white/75 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/50" />
                  {BUSINESS.email}
                </a>
                <p className="text-[12px] text-white/45">{BUSINESS.hours}</p>
              </div>

              <CtaButton href="/contact" fullWidth className="mt-5">
                Talk to an Expert
              </CtaButton>
            </div>
          </motion.div>
        </motion.div>

        <FooterBottom className="mt-6" />
      </div>
    </footer>
  );
}
