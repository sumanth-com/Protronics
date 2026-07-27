import type { Metadata } from "next";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_URL,
} from "@/lib/site";

export type PageSeoInput = {
  /** Page title without site suffix (layout template adds ` | Protronics`). Use `absoluteTitle` to override fully. */
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const title = input.absoluteTitle ?? input.title ?? SITE_TITLE_DEFAULT;
  const canonical = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;
  const url = absoluteUrl(canonical);
  const imageAlt =
    input.ogImage && input.ogImage !== DEFAULT_OG_IMAGE
      ? title
      : OG_IMAGE_ALT;

  return {
    title: input.absoluteTitle
      ? { absolute: input.absoluteTitle }
      : input.title
        ? input.title
        : undefined,
    description: input.description,
    // Page-specific keywords only — avoid dumping the full site keyword set on every URL
    keywords: input.keywords?.length ? [...input.keywords] : undefined,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: input.ogType ?? "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title,
      description: input.description,
      url,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage)],
    },
  };
}

/** Root layout metadata (defaults + icons; no page-level canonical). */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE_DEFAULT,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [...SITE_KEYWORDS],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "shopping",
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE_DEFAULT,
      description: SITE_DESCRIPTION,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
    verification: {
      google:
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
        "UVQBIxkLv3m2ax-ACBVPhAS999Ywy8KvFNG6aaLTM5s",
    },
  };
}

export const PAGE_SEO = {
  home: {
    absoluteTitle: `${SITE_NAME} | Premium Refurbished Refrigerators & Appliances`,
    description:
      "Protronics is a Bengaluru refurbished appliance store selling certified refrigerators and washing machines with warranty, trade-in, delivery, and local support. Browse quality-tested units with 100+ checks across Bangalore.",
    path: "/",
    keywords: [
      "refurbished refrigerator bangalore",
      "refurbished fridge",
      "certified refurbished appliances",
      "refurbished refrigerator with warranty",
      "buy refurbished refrigerator online",
    ],
  },
  shop: {
    title: "Shop Refurbished Refrigerators",
    description:
      "Browse certified refurbished refrigerators and washing machines from trusted brands. Quality tested, sanitized, warranty included, and ready for delivery.",
    path: "/shop",
    keywords: [
      "refurbished refrigerator",
      "refurbished fridge",
      "refurbished washing machine",
      "second hand refrigerator",
    ],
  },
  sell: {
    title: "Trade In Your Old Refrigerator",
    description:
      "Exchange your old refrigerator and upgrade to a premium refurbished appliance. Get a fair valuation and hassle-free trade-in experience with Protronics.",
    path: "/sell",
    keywords: [
      "refrigerator trade-in",
      "sell old fridge",
      "appliance exchange",
      "refrigerator trade-in Bangalore",
    ],
  },
  about: {
    title: "About Protronics | Certified Refurbished Appliances Bangalore",
    absoluteTitle: "About Protronics | Certified Refurbished Appliances Bangalore",
    description:
      "Protronics restores and certifies refrigerators and washing machines in Bengaluru through rigorous quality testing, sanitization, performance verification, and warranty-backed delivery.",
    path: "/about",
    keywords: [
      "Protronics Bangalore",
      "certified refurbished appliances",
      "refurbished appliance store bangalore",
    ],
  },
  contact: {
    title: "Contact Protronics | Appliance Support & Inquiries",
    absoluteTitle: "Contact Protronics | Appliance Support & Inquiries",
    description:
      "Need help choosing a refurbished appliance in Bangalore? Contact Protronics for support, product inquiries, trade-ins, warranty, and delivery across Bengaluru.",
    path: "/contact",
    keywords: [
      "refurbished refrigerator bangalore",
      "appliance store bengaluru",
      "second hand fridge shop near me",
    ],
  },
  faq: {
    title: "Help Center & FAQs",
    description:
      "Find answers about refurbished appliances, warranties, delivery, trade-ins, quality testing, and support from Protronics in Bangalore.",
    path: "/support",
    keywords: [
      "refurbished refrigerator with warranty",
      "refurbished appliances FAQ",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Protronics collects, uses, stores, and protects personal data when you browse, enquire, trade in, or buy refurbished appliances.",
    path: "/privacy-policy",
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "Review the terms governing purchases, warranties, trade-ins, and services provided by Protronics.",
    path: "/terms-of-service",
  },
  warranty: {
    title: "Warranty & Support",
    description:
      "1-year warranty on restored function for Protronics refurbished appliances, plus delivery, installation guidance, and dedicated Bangalore support.",
    path: "/warranty",
    keywords: [
      "refurbished refrigerator with warranty",
      "appliance warranty Bangalore",
    ],
  },
  howItWorks: {
    title: "How Protronics Refurbishes Appliances",
    absoluteTitle: "How Protronics Refurbishes Appliances",
    description:
      "See how Protronics renews refrigerators and washing machines through 100+ quality checks, deep sanitization, performance certification, and warranty-backed delivery in Bangalore.",
    path: "/how-it-works",
    keywords: [
      "how refurbished refrigerators work",
      "certified refurbished appliances bangalore",
    ],
  },
  shopLocal: {
    title: "Shop Refurbished Refrigerators",
    description:
      "Browse certified refurbished refrigerators in Bangalore. Quality tested, sanitized, warranty included — delivery across Bengaluru metro.",
    path: "/shop",
    keywords: [
      "refurbished refrigerator bangalore",
      "second hand refrigerator bangalore",
      "second hand fridge bangalore",
      "affordable refurbished appliances",
    ],
  },
} as const;
