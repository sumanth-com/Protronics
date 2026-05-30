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
      { label: "All Refrigerators", href: "/shop" },
      { label: "Double Door", href: "/shop/double-door" },
      { label: "Single Door", href: "/shop/single-door" },
      { label: "Mini Fridges", href: "/shop/mini-fridges" },
      { label: "Premium Hubs", href: "/shop/premium-hubs" },
      { label: "Commercial", href: "/shop/commercial" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Warranty", href: "/warranty" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Protronics", href: "/why-protronics" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Hot Deals", href: "/trade-in" },
      { label: "About", href: "/about" },
      { label: "Compare", href: "/compare" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const FOOTER_SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    label: "WhatsApp",
    href: BUSINESS.whatsapp,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
] as const;
