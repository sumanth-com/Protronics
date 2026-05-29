export const BUSINESS = {
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  email: "support@protronics.in",
  emailHref: "mailto:support@protronics.in",
  whatsapp: "https://wa.me/919000000000",
  whatsappMessage:
    "https://wa.me/919000000000?text=Hi%20Protronics%2C%20I%27d%20like%20help%20choosing%20a%20refurbished%20refrigerator.",
  whatsappChannel: "https://whatsapp.com/channel/0029VaExampleChannelId",
  address: "Protronics Experience Hub, Indiranagar, Bengaluru, Karnataka 560038",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Indiranagar%2C+Bengaluru%2C+Karnataka&hl=en&z=14&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Indiranagar+Bengaluru+Karnataka",
  hours: "Mon–Sat · 10:00 AM – 7:00 PM",
  serviceAreas: "Bengaluru, Whitefield, Electronic City, Mysore Road & surrounding districts",
  delivery: "Metro Bengaluru + select tier‑2 cities with white‑glove setup",
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
  "rounded-3xl border border-white/12 bg-white/[0.05]",
  "supports-[backdrop-filter]:bg-white/[0.055] supports-[backdrop-filter]:backdrop-blur-xl",
  "shadow-[0_30px_100px_rgba(0,0,0,0.55)]",
].join(" ");

export const greenGlow =
  "bg-[radial-gradient(700px_280px_at_20%_0%,rgba(57,255,136,0.14),transparent_58%)]";
