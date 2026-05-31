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
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.5 7H17V4h-2.5C12.57 4 11 5.57 11 7.5V10H8v3h3v8h3v-8h2.9l.6-3H14v-2.5c0-.55.45-1 1-1z" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
  Facebook: FacebookIcon,
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
            <Icon
              className={cn(
                "text-white/75 transition-colors duration-200 group-hover:text-white",
                s.label === "Facebook" ? "h-[18px] w-[18px]" : "h-4 w-4",
              )}
            />
          </motion.a>
        );
      })}
    </div>
  );
}
