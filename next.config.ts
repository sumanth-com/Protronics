import type { NextConfig } from "next";

/**
 * OneDrive locks `.next` on Windows — use a cache path locally only.
 * Vercel/CI must use the default `.next` or deployment packaging breaks.
 */
const distDir =
  process.env.VERCEL === "1" || process.env.CI === "true"
    ? ".next"
    : "node_modules/.cache/next";

/** Expose VITE_* from .env to the Next.js client bundle. */
const DEFAULT_SITE_URL = "https://protronics.store";

const viteFormEndpoint = process.env.VITE_FORM_ENDPOINT_URL?.trim() ?? "";
const viteGaId = process.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
const viteSiteUrl = process.env.VITE_SITE_URL?.trim() ?? "";
const siteUrl =
  viteSiteUrl ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  DEFAULT_SITE_URL;

const nextConfig: NextConfig = {
  distDir,
  env: {
    NEXT_PUBLIC_FORM_ENDPOINT_URL:
      viteFormEndpoint ||
      process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL?.trim() ||
      process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() ||
      "",
    NEXT_PUBLIC_FORM_ENDPOINT:
      viteFormEndpoint ||
      process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() ||
      process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL?.trim() ||
      "",
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      viteGaId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/trade-in",
        destination: "/sell",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/support",
        permanent: true,
      },
      {
        source: "/why",
        destination: "/why-protronics",
        permanent: true,
      },
      {
        source: "/shop/refrigerators",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/shop/product/:id",
        destination: "/product/:id",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/hot-deals",
        destination: "/best-deals",
        permanent: true,
      },
      {
        source: "/deals",
        destination: "/best-deals",
        permanent: true,
      },
      {
        source: "/bangalore",
        destination: "/locations/bangalore",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [60, 75, 82, 85, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
  },
  webpack: (config, { dev }) => {
    // OneDrive can lock .next cache files; skip persistent cache in dev.
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
