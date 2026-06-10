/**
 * Single source of truth for NAP (Name, Address, Phone) and local business data.
 * Update here only — contact, footer, schema, and location pages stay in sync.
 */

export const PROTRONICS_NAP = {
  name: "Protronics",
  legalName: "Protronics",
  category: "Refurbished Appliance Store",
  telephone: "+91 88612 36266",
  telephoneE164: "+918861236266",
  telephoneSecondary: "+91 86181 35976",
  telephoneSecondaryE164: "+918618135976",
  /** Combined display for UI (both contact numbers). */
  telephoneDisplay: "8861236266 / 8618135976",
  email: "Protronicspro4@gmail.com",
  streetAddress:
    "4/1, Amani Byrathi Kaney, Vaddarapalya, near Hosanna AG Workshop",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  postalCode: "560043",
  addressCountry: "IN",
  /** Display line for UI (consistent everywhere). */
  addressDisplay:
    "4/1, Amani Byrathi Kaney, Vaddarapalya, near Hosanna AG Workshop, Bengaluru 560043",
  latitude: 13.0504,
  longitude: 77.5074,
} as const;

const MAPS_ADDRESS_QUERY = encodeURIComponent(
  "4/1 Amani Byrathi Kaney Vaddarapalya near Hosanna AG Workshop Bangalore 560043",
);

/** Google Business Profile / Maps listing — set in env when live. */
export const GOOGLE_BUSINESS_PROFILE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL?.trim() ||
  `https://www.google.com/maps/search/?api=1&query=${MAPS_ADDRESS_QUERY}`;

export const GOOGLE_MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() ||
  `https://maps.google.com/maps?q=${MAPS_ADDRESS_QUERY}&hl=en&z=15&output=embed`;

export const GOOGLE_MAPS_DIRECTIONS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL?.trim() ||
  GOOGLE_BUSINESS_PROFILE_URL;

export const BUSINESS_HOURS = {
  label: "Mon–Sat · 10:00 AM – 7:00 PM",
  specification: [
    {
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ] as const,
      opens: "10:00",
      closes: "19:00",
    },
  ],
} as const;

export const PROTRONICS_SERVICES = [
  {
    id: "refurbished-refrigerators",
    name: "Refurbished Refrigerators",
    description:
      "Certified refurbished single-door, double-door, and premium refrigerators with warranty and delivery in Bengaluru.",
  },
  {
    id: "refurbished-washing-machines",
    name: "Refurbished Washing Machines",
    description:
      "Quality-tested renewed washing machines with sanitization and support for Bangalore metro homes.",
  },
  {
    id: "appliance-trade-in",
    name: "Appliance Trade-In",
    description:
      "Trade in your old refrigerator or appliance for fair value and upgrade to a certified refurbished unit.",
  },
  {
    id: "appliance-exchange",
    name: "Appliance Exchange",
    description:
      "Exchange your used appliance toward a premium refurbished model with hassle-free pickup in Bengaluru.",
  },
  {
    id: "support",
    name: "Appliance Support",
    description:
      "Expert phone and WhatsApp support for product selection, delivery, and after-sales assistance.",
  },
  {
    id: "warranty",
    name: "Warranty",
    description:
      "Warranty-backed refurbished appliances with clear coverage and human support when you need it.",
  },
] as const;

export const SERVICE_AREA_CITIES = [
  "Bengaluru",
  "Whitefield",
  "Electronic City",
  "Indiranagar",
  "Koramangala",
  "HSR Layout",
  "Marathahalli",
  "Jayanagar",
  "Hebbal",
  "Yelahanka",
  "Sarjapur Road",
  "Mysore Road",
] as const;

export const SERVICE_AREA_SUMMARY =
  "Bengaluru metro — Whitefield, Electronic City, Indiranagar, Koramangala, HSR, Marathahalli, Jayanagar, Hebbal & surrounding districts";

export const DELIVERY_COVERAGE =
  "Metro Bengaluru and select surrounding regions with white-glove delivery and installation";

/** Primary local SEO keyword targets (Bangalore / Bengaluru). */
export const LOCAL_SEO_KEYWORDS = [
  "second hand fridge near me",
  "second hand fridge shop near me",
  "refurbished refrigerator bangalore",
  "refurbished refrigerator bengaluru",
  "second hand refrigerator bangalore",
  "second hand refrigerator bengaluru",
  "used refrigerator with warranty",
  "refurbished washing machine bangalore",
  "refurbished washing machine bengaluru",
  "appliance trade in bangalore",
  "appliance trade in bengaluru",
  "refurbished appliance store bangalore",
  "second hand fridge bangalore",
] as const;

export const PRIMARY_LOCATION = {
  slug: "bangalore",
  name: "Bangalore",
  alternateName: "Bengaluru",
  path: "/locations/bangalore",
} as const;
