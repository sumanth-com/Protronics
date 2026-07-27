import type { NextConfig } from "next";

/**
 * OneDrive locks `.next` on Windows — use a cache path locally only.
 * Vercel/CI must use the default `.next` or deployment packaging breaks.
 */
const distDir =
  process.env.VERCEL === "1" || process.env.CI === "true"
    ? ".next"
    : "node_modules/.cache/next";

const DEFAULT_SITE_URL = "https://protronics.store";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.VITE_SITE_URL?.trim() ||
  DEFAULT_SITE_URL;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com https://maps.gstatic.com https://*.googleapis.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  distDir,
  env: {
    // Do NOT bake form webhook URLs into the client bundle.
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      process.env.VITE_GA_MEASUREMENT_ID?.trim() ||
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
      "",
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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
