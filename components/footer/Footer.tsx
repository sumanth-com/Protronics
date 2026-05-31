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
import Logo from "@/assets/Logo.webp";

const footerCard = cn(
  "footer-card footer-surface rounded-2xl border border-theme-border sm:rounded-[24px]",
  "bg-theme-surface-card supports-[backdrop-filter]:backdrop-blur-xl",
);

export default function Footer() {
  return (
    <footer className="footer-root relative overflow-hidden border-t border-theme-border bg-theme-bg">
      <div className="footer-root-inner relative mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <FooterNewsletter className={footerCard} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0px" }}
          className="footer-grid mt-5 grid gap-6 sm:mt-6 md:grid-cols-12 md:gap-8"
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
              <div className="footer-brand-name text-[15px] font-semibold tracking-tight text-theme-fg">
                Protronics
              </div>
            </Link>

            <p className="footer-brand-desc mt-2.5 max-w-sm text-[13px] leading-6 text-theme-fg-muted">
              Premium renewed appliances—restored with confidence, backed by warranty.
            </p>

            <FooterSocials className="mt-3.5" />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-5">
            <FooterLinks />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-3">
            <div className={cn("footer-support-panel", footerCard, "px-4 py-4 md:px-5 md:py-5")}>
              <div className="text-[11px] font-medium tracking-[0.2em] text-theme-fg-faint">
                SUPPORT
              </div>
              <div className="mt-2 text-[15px] font-semibold tracking-tight text-theme-fg">
                Need help choosing?
              </div>
              <p className="mt-1.5 text-[13px] leading-6 text-theme-fg-muted">
                Talk to an expert for quick, confident guidance.
              </p>

              <div className="mt-3 space-y-1.5">
                <a
                  href={BUSINESS.phoneHref}
                  className="footer-support-line flex items-center gap-2 text-[13px] text-theme-fg-secondary transition-colors hover:text-theme-fg"
                >
                  <Phone className="h-4 w-4 shrink-0 text-theme-fg-faint" />
                  {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS.emailHref}
                  className="footer-support-line flex items-center gap-2 text-[13px] text-theme-fg-secondary transition-colors hover:text-theme-fg"
                >
                  <Mail className="h-4 w-4 shrink-0 text-theme-fg-faint" />
                  {BUSINESS.email}
                </a>
                <p className="text-[12px] text-theme-fg-faint">{BUSINESS.hours}</p>
              </div>

              <CtaButton href="/contact" fullWidth className="mt-4">
                Talk to an Expert
              </CtaButton>
            </div>
          </motion.div>
        </motion.div>

        <FooterBottom className="mt-5 border-t border-theme-border-subtle pt-4 sm:mt-6" />
      </div>
    </footer>
  );
}
