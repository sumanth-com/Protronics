import type { StaticImageData } from "next/image";
import Desktop2 from "@/assets/2.webp";
import Mobile1 from "@/assets/mb-1.webp";
import Mobile2 from "@/assets/mb-2.webp";
import Mobile3 from "@/assets/mb-3.webp";
import Mobile5 from "@/assets/mb-5.webp";

export type HeroSlideImage = StaticImageData;

/** Same banner images for mobile and desktop. */
export const HERO_SLIDES: HeroSlideImage[] = [
  Mobile1,
  Mobile2,
  Mobile3,
  Mobile5,
  Desktop2,
];

/** @deprecated Use HERO_SLIDES — kept as alias during transition. */
export const MOBILE_HERO_SLIDES = HERO_SLIDES;
