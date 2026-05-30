"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FOOTER_SOCIAL_LINKS } from "@/lib/footer";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M16 11.999a4 4 0 1 1-7.999 0 4 4 0 0 1 7.999 0Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 8h2V5h-2c-2.21 0-4 1.79-4 4v3H8v3h2v6h3v-6h2.2l.8-3H13V9c0-.55.45-1 1-1Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9v12" />
      <path d="M6 5.5h.01" />
      <path d="M10 9v12" />
      <path d="M10 13c0-2.2 1.8-4 4-4s4 1.8 4 4v8" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
};

export type FooterSocialsProps = {
  className?: string;
};

export default function FooterSocials({ className }: FooterSocialsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {FOOTER_SOCIAL_LINKS.map((s) => {
        const Icon = ICONS[s.label] ?? InstagramIcon;
        const external = s.href.startsWith("http");
        return (
          <motion.a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "footer-social-btn group grid h-9 w-9 place-items-center rounded-full",
              "border border-white/[0.08] bg-black",
            )}
          >
            <Icon className="h-4 w-4 text-white/75 transition-colors duration-200 group-hover:text-white" />
          </motion.a>
        );
      })}
    </div>
  );
}
