import { LOCAL_SEO_KEYWORDS, PRIMARY_LOCATION, PROTRONICS_SERVICES, SERVICE_AREA_CITIES } from "@/lib/local/business";

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
    keywords: [...LOCAL_SEO_KEYWORDS],
    heroTitle: "Refurbished Appliances in Bangalore",
    heroSubtitle:
      "Certified second hand & refurbished refrigerators with warranty — serving Bengaluru and surrounding areas.",
    intro: [
      "Protronics is your local refurbished appliance store in Bengaluru, built for families who want premium quality without paying brand-new prices. Whether you search for a second hand fridge near me, a refurbished refrigerator in Bangalore, or a used refrigerator with warranty, we deliver transparent inspections, sanitization, and human support.",
      "Browse single-door, double-door, mini, and premium refrigerators — all 100+ point tested. Trade in your old unit for fair value, or exchange toward an upgrade with doorstep pickup across Whitefield, Electronic City, Koramangala, HSR, Indiranagar, and the wider Bangalore metro.",
    ],
    localFaqs: [
      {
        question: "Do you sell second hand fridges in Bangalore?",
        answer:
          "Yes. Protronics sells professionally refurbished refrigerators across Bengaluru — not unverified classified listings. Every unit is tested, sanitized, and sold with warranty and delivery support.",
      },
      {
        question: "Is there a second hand fridge shop near me in Bengaluru?",
        answer:
          "We serve the full Bangalore metro with delivery and installation. Contact us on WhatsApp or phone to confirm availability in your area — including Whitefield, Electronic City, Jayanagar, and surrounding districts.",
      },
      {
        question: "Do refurbished refrigerators come with warranty?",
        answer:
          "Yes. Premium renewed units include warranty coverage with clear terms and responsive support — a key reason customers choose Protronics over informal second hand sellers.",
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
