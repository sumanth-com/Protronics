"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { IMAGE_QUALITY } from "@/lib/images";
import { cn } from "@/lib/utils";
import FooterLinks from "@/components/footer/FooterLinks";
import FooterNewsletter from "@/components/footer/FooterNewsletter";
import FooterSocials from "@/components/footer/FooterSocials";
import FooterBottom from "@/components/footer/FooterBottom";
import CtaButton from "@/components/ui/CtaButton";
import Logo from "@/assets/Logo.png";

const footerSurface = cn(
  "rounded-[28px] border border-white/[0.08]",
  "bg-black",
  "supports-[backdrop-filter]:bg-black supports-[backdrop-filter]:backdrop-blur-xl",
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16">
        <FooterNewsletter className={footerSurface} />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className="mt-10 grid gap-10 md:grid-cols-12 md:gap-10"
        >
          <motion.div variants={fadeUp} className="md:col-span-4">
            <Link href="/" prefetch className="inline-flex items-center gap-2.5">
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={Logo}
                  alt="Protronics"
                  fill
                  sizes="40px"
                  className="object-contain"
                  quality={IMAGE_QUALITY.logo}
                />
              </div>
              <div className="text-[16px] font-semibold tracking-tight text-white">
                Protronics
              </div>
            </Link>

            <div className="mt-4 max-w-sm text-[13px] leading-7 text-white/65">
              Premium renewed appliances engineered for modern living—restored
              with confidence, backed by warranty, delivered with care.
            </div>

            <FooterSocials className="mt-6" />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-5">
            <FooterLinks />
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-3">
            <div className={cn(footerSurface, "px-6 py-6")}>
              <div className="text-[12px] font-medium tracking-[0.22em] text-white/50">
                SUPPORT
              </div>
              <div className="mt-3 text-[16px] font-semibold tracking-tight text-white">
                Need help choosing?
              </div>
              <div className="mt-2 text-[13px] leading-7 text-white/65">
                Talk to an expert for quick, confident guidance.
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-[13px] text-white/70">
                  <Phone className="h-4 w-4 text-white/50" />
                  <span>+91 90000 00000</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-white/70">
                  <Mail className="h-4 w-4 text-white/50" />
                  <span>support@protronics.in</span>
                </div>
                <div className="text-[12px] text-white/45">
                  Mon–Sat · 10:00 AM – 7:00 PM
                </div>
              </div>

              <CtaButton href="/contact" fullWidth className="mt-6">
                Talk to an Expert
              </CtaButton>
            </div>
          </motion.div>
        </motion.div>

        <FooterBottom />
      </div>
    </footer>
  );
}
