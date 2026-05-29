"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Sparkles } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import FooterLinks from "@/components/footer/FooterLinks";
import FooterNewsletter from "@/components/footer/FooterNewsletter";
import FooterSocials from "@/components/footer/FooterSocials";
import FooterBottom from "@/components/footer/FooterBottom";
import CtaButton from "@/components/ui/CtaButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glow,
        { y: -10 },
        {
          y: 18,
          ease: "none",
          scrollTrigger: {
            trigger: glow,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, glow);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* subtle top fade from final CTA */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,90,85,0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(980px_760px_at_18%_52%,rgba(255,255,255,0.06),transparent_62%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <div
          ref={glowRef}
          className="absolute -left-44 top-16 h-[560px] w-[560px] rounded-full bg-[#ff5a55]/[0.08] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-10 sm:px-6 sm:pt-16">
        <FooterNewsletter />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
          className="mt-10 grid gap-10 md:grid-cols-12 md:gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-4">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.05] shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
                <Sparkles className="h-5 w-5 text-[#ff5a55]/90" />
              </div>
              <div className="text-[16px] font-semibold tracking-tight text-white">
                Protronics
              </div>
            </div>

            <div className="mt-4 max-w-sm text-[13px] leading-7 text-white/70">
              Premium renewed appliances engineered for modern living—restored
              with confidence, backed by warranty, delivered with care.
            </div>

            <FooterSocials className="mt-6" />
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <FooterLinks />
          </motion.div>

          {/* Contact / support */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <div
              className={cn(
                "rounded-[28px] border border-white/12 bg-white/[0.05]",
                "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
                "shadow-[0_40px_140px_rgba(0,0,0,0.70)]",
                "px-6 py-6",
              )}
            >
              <div className="text-[12px] font-medium tracking-[0.22em] text-white/55">
                SUPPORT
              </div>
              <div className="mt-3 text-[16px] font-semibold tracking-tight text-white">
                Need help choosing?
              </div>
              <div className="mt-2 text-[13px] leading-7 text-white/70">
                Talk to an expert for quick, confident guidance.
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-[13px] text-white/75">
                  <Phone className="h-4 w-4 text-white/60" />
                  <span>+91 90000 00000</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-white/75">
                  <Mail className="h-4 w-4 text-white/60" />
                  <span>support@protronics.in</span>
                </div>
                <div className="text-[12px] text-white/55">
                  Mon–Sat · 10:00 AM – 7:00 PM
                </div>
              </div>

              <CtaButton href="#contact" fullWidth className="mt-6">
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

