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
      { label: "Washing Machines", href: "/shop/washing-machines" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Sell", href: "/sell" },
      { label: "Bangalore Store", href: "/locations/bangalore" },
      { label: "About", href: "/about" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-of-service" },
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
] as const;
