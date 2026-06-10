import {
  DELIVERY_COVERAGE,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  PROTRONICS_NAP,
  SERVICE_AREA_SUMMARY,
  BUSINESS_HOURS,
} from "@/lib/local/business";

/** NAP-consistent business contact (single source: lib/local/business.ts). */
export const BUSINESS = {
  name: PROTRONICS_NAP.name,
  phone: PROTRONICS_NAP.telephoneDisplay,
  phoneHref: `tel:${PROTRONICS_NAP.telephoneE164}`,
  phoneSecondary: PROTRONICS_NAP.telephoneSecondary,
  phoneSecondaryHref: `tel:${PROTRONICS_NAP.telephoneSecondaryE164}`,
  phones: [
    { display: "8861236266", href: `tel:${PROTRONICS_NAP.telephoneE164}` },
    { display: "8618135976", href: `tel:${PROTRONICS_NAP.telephoneSecondaryE164}` },
  ] as const,
  email: PROTRONICS_NAP.email,
  emailHref: `mailto:${PROTRONICS_NAP.email}`,
  whatsapp: `https://wa.me/${PROTRONICS_NAP.telephoneE164.replace("+", "")}`,
  whatsappMessage: `https://wa.me/${PROTRONICS_NAP.telephoneE164.replace("+", "")}?text=${encodeURIComponent("Hi Protronics, I'd like help choosing a refurbished refrigerator in Bengaluru.")}`,
  whatsappChannel: "https://whatsapp.com/channel/0029VaExampleChannelId",
  address: PROTRONICS_NAP.addressDisplay,
  streetAddress: PROTRONICS_NAP.streetAddress,
  locality: PROTRONICS_NAP.addressLocality,
  region: PROTRONICS_NAP.addressRegion,
  postalCode: PROTRONICS_NAP.postalCode,
  mapEmbedUrl: GOOGLE_MAPS_EMBED_URL,
  mapDirectionsUrl: GOOGLE_MAPS_DIRECTIONS_URL,
  googleBusinessProfileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  hours: BUSINESS_HOURS.label,
  serviceAreas: SERVICE_AREA_SUMMARY,
  delivery: DELIVERY_COVERAGE,
} as const;

export const FRIDGE_PRODUCTS = [
  "Single Door Refrigerator",
  "Double Door Refrigerator",
  "Mini Fridge",
  "Premium / Side-by-Side",
  "Commercial Refrigerator",
  "Not sure yet",
] as const;

export const contactGlass = [
  "rounded-3xl border border-white/12 bg-black",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");
