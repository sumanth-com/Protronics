import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  ClipboardCheck,
  Leaf,
  PackageCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export type WhyChooseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Mobile homepage — compact “why choose us” highlights */
export const MOBILE_WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    icon: ClipboardCheck,
    title: "100+ Point Testing",
    description: "Cooling, seals, sensors, and safety verified before dispatch.",
  },
  {
    icon: Sparkles,
    title: "Deep Sanitization",
    description: "Professional cleaning inside, outside, and airflow paths.",
  },
  {
    icon: Truck,
    title: "Delivery & Setup",
    description: "Careful handling with placement so it's ready the same day.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Appliances",
    description: "Authentic models with documented inspection standards.",
  },
  {
    icon: PackageCheck,
    title: "Premium Restoration",
    description: "Cosmetic refinement that feels genuinely first-class.",
  },
  {
    icon: Leaf,
    title: "Energy Checked",
    description: "Efficiency validated to help lower long-term power costs.",
  },
];
