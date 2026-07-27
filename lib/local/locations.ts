import { PRIMARY_LOCATION, PROTRONICS_SERVICES, SERVICE_AREA_CITIES } from "@/lib/local/business";

export type LocationPageConfig = {
  slug: string;
  city: string;
  alternateName: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  intro: string[];
  localFaqs: { question: string; answer: string }[];
};

export const LOCATION_PAGES: LocationPageConfig[] = [
  {
    slug: PRIMARY_LOCATION.slug,
    city: PRIMARY_LOCATION.name,
    alternateName: PRIMARY_LOCATION.alternateName,
    path: PRIMARY_LOCATION.path,
    title: "Refurbished Refrigerators in Bangalore | Protronics",
    description:
      "Looking for a second hand fridge shop near you in Bangalore? Protronics offers certified refurbished refrigerators and appliances with warranty, trade-in, delivery, and local support across Bengaluru.",
    keywords: [
      "refurbished refrigerator bangalore",
      "second hand fridge bangalore",
      "refurbished appliances near me",
      "used refrigerator with warranty",
      "appliance trade in bangalore",
      "refurbished washing machine bangalore",
    ],
    heroTitle: "Refurbished Appliances in Bangalore",
    heroSubtitle:
      "Certified refurbished refrigerators and washing machines with warranty — serving Bengaluru and surrounding areas.",
    intro: [
      "Protronics is a Bengaluru refurbished appliance store for families who want certified quality without paying brand-new prices. Every refrigerator and washing machine is inspected, sanitized, and sold with clear warranty terms plus delivery support across Bangalore.",
      "Browse single-door, double-door, and washing machine options—all 100+ point tested. Trade in your old unit for fair value, or exchange toward an upgrade with pickup across Whitefield, Electronic City, Koramangala, HSR, Indiranagar, and the wider metro.",
    ],
    localFaqs: [
      {
        question: "Do you sell second hand fridges in Bangalore?",
        answer:
          "Yes. Protronics sells professionally refurbished refrigerators across Bengaluru — not unverified classified listings. Every unit is tested, sanitized, and sold with warranty and delivery support.",
      },
      {
        question: "Is there a refurbished appliance store near me in Bengaluru?",
        answer:
          "We serve the full Bangalore metro with delivery and installation. Contact us on WhatsApp or phone to confirm availability in your area — including Whitefield, Electronic City, Jayanagar, and surrounding districts.",
      },
      {
        question: "Do refurbished refrigerators come with warranty?",
        answer:
          "Yes. Protronics refurbished refrigerators include a 1-year warranty covering restored function and restoration-related defects under normal residential use. Cosmetic wear from prior ownership may be excluded—see the warranty page for full terms.",
      },
      {
        question: "Can I trade in my old refrigerator in Bangalore?",
        answer:
          "Yes. Our appliance trade-in program offers fair valuations and optional credit toward a certified refurbished upgrade, with hassle-free pickup in Bengaluru.",
      },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationPageConfig | undefined {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}

export function getAllLocationSlugs() {
  return LOCATION_PAGES.map((l) => l.slug);
}

export function getLocationServicesForDisplay() {
  return PROTRONICS_SERVICES;
}

export function getLocationAreasForDisplay() {
  return SERVICE_AREA_CITIES;
}
