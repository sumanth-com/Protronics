import type { NextConfig } from "next";

/** Keep build output out of OneDrive-synced `.next` to avoid EBUSY 500s on refresh. */
const distDir = "node_modules/.cache/next";

const nextConfig: NextConfig = {
  distDir,
  turbopack: {
    root: __dirname,
  },
  devIndicators: false,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
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
