import { BUSINESS } from "@/lib/contact";

export type FooterLink = { label: string; href: string };

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_NAV_GROUPS: FooterLinkGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All Appliances", href: "/shop" },
      { label: "Double Door", href: "/shop/double-door" },
      { label: "Single Door", href: "/shop/single-door" },
      { label: "Washing Machines", href: "/shop/washing-machines" },
      { label: "Best Deals", href: "/best-deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center / FAQ", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Sell / Trade-In", href: "/sell" },
      { label: "About", href: "/about" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-of-service" },
];

/** Only include networks with a real business profile URL. */
export const FOOTER_SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: BUSINESS.whatsapp,
  },
] as const;
