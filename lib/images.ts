/** Default Next/Image quality — balances sharpness and payload size. */
export const IMAGE_QUALITY = {
  hero: 90,
  product: 80,
  card: 75,
  logo: 85,
  section: 82,
} as const;

/** Remote section backgrounds (Unsplash — configured in next.config remotePatterns). */
export const SECTION_IMAGES = {
  finalCta:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=80",
  warrantySupport: "/warranty/support-visual.webp",
} as const;

/** Hero rating pill — overlapping customer avatars. */
export const HERO_REVIEW_AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
    alt: "Happy Protronics customer",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80",
    alt: "Happy Protronics customer",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&h=96&q=80",
    alt: "Happy Protronics customer",
  },
] as const;
