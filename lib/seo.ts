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

  return {
    title: input.absoluteTitle
      ? { absolute: input.absoluteTitle }
      : input.title
        ? input.title
        : undefined,
    description: input.description,
    keywords: [...SITE_KEYWORDS, ...(input.keywords ?? [])],
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
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
          alt: OG_IMAGE_ALT,
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
      site: "@protronics",
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
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
  };
}

export const PAGE_SEO = {
  home: {
    absoluteTitle: `${SITE_NAME} | Premium Refurbished Refrigerators & Appliances`,
    description:
      "Discover professionally refurbished refrigerators and home appliances in Bangalore — 100+ quality checks, warranty, trade-in, and delivery across Bengaluru and surrounding regions.",
    path: "/",
    keywords: [
      "second hand fridge near me",
      "refurbished refrigerator bangalore",
      "used refrigerator with warranty",
    ],
  },
  shop: {
    title: "Shop Refurbished Refrigerators",
    description:
      "Browse certified refurbished refrigerators from trusted brands. Quality tested, sanitized, warranty included, and ready for delivery.",
    path: "/shop",
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
      "upgrade refrigerator",
      "appliance trade in bangalore",
    ],
  },
  about: {
    title: "About Protronics | Premium Refurbished Appliances",
    absoluteTitle: "About Protronics | Premium Refurbished Appliances",
    description:
      "Learn how Protronics restores and certifies refrigerators and appliances through rigorous quality testing, sanitization, and performance verification.",
    path: "/about",
  },
  contact: {
    title: "Contact Protronics | Appliance Support & Inquiries",
    absoluteTitle: "Contact Protronics | Appliance Support & Inquiries",
    description:
      "Need help choosing a refurbished appliance in Bangalore? Contact Protronics for support, product inquiries, trade-ins, warranty, and delivery across Bengaluru.",
    path: "/contact",
    keywords: [
      "refurbished refrigerator bangalore",
      "second hand fridge shop near me",
      "appliance store bengaluru",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Find answers about refurbished appliances, warranties, delivery, trade-ins, quality testing, and support.",
    path: "/support",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Learn how Protronics collects, protects, and manages customer information.",
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
      "1-year warranty, delivery and installation, and dedicated support for every premium refurbished appliance from Protronics.",
    path: "/warranty",
  },
  howItWorks: {
    title: "How It Works",
    description:
      "See how Protronics renews premium appliances through 100+ quality checks, deep sanitization, performance certification, and warranty-backed delivery.",
    path: "/how-it-works",
  },
  shopLocal: {
    title: "Shop Refurbished Refrigerators",
    description:
      "Browse certified refurbished refrigerators in Bangalore. Quality tested, sanitized, warranty included — delivery across Bengaluru metro.",
    path: "/shop",
    keywords: ["refurbished refrigerator bangalore", "second hand refrigerator bangalore"],
  },
} as const;
