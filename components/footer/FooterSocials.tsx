"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FOOTER_SOCIAL_LINKS } from "@/lib/footer";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  WhatsApp: WhatsAppIcon,
};

export type FooterSocialsProps = {
  className?: string;
};

export default function FooterSocials({ className }: FooterSocialsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {FOOTER_SOCIAL_LINKS.map((s) => {
        const Icon = ICONS[s.label] ?? WhatsAppIcon;
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
