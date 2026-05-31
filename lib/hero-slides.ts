import type { StaticImageData } from "next/image";
import Desktop1 from "@/assets/1.webp";
import Desktop2 from "@/assets/2.webp";
import Desktop3 from "@/assets/3.webp";
import Desktop4 from "@/assets/4.webp";
import Desktop5 from "@/assets/5.webp";
import Mobile1 from "@/assets/mb-1.webp";
import Mobile2 from "@/assets/mb-2.webp";
import Mobile3 from "@/assets/mb-3.webp";
import Mobile4 from "@/assets/mb-4.webp";
import Mobile5 from "@/assets/mb-5.webp";
import Mobile6 from "@/assets/mb-6.webp";

export type HeroSlideImage = StaticImageData;

export const DESKTOP_HERO_SLIDES: HeroSlideImage[] = [
  Desktop1,
  Desktop2,
  Desktop3,
  Desktop4,
  Desktop5,
];

export const MOBILE_HERO_SLIDES: HeroSlideImage[] = [
  Mobile1,
  Mobile2,
  Mobile3,
  Mobile4,
  Mobile5,
  Mobile6,
];
