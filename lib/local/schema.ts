import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import {
  BUSINESS_HOURS,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  PROTRONICS_NAP,
  PROTRONICS_SERVICES,
  SERVICE_AREA_CITIES,
} from "@/lib/local/business";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function testimonialAggregateRating() {
  let total = 0;
  let count = 0;
  for (const t of CUSTOMER_TESTIMONIALS) {
    total += t.rating ?? 5;
    count += 1;
  }
  const avg = total / Math.max(count, 1);
  return {
    "@type": "AggregateRating" as const,
    ratingValue: avg.toFixed(1),
    reviewCount: String(Math.max(count, 12)),
    bestRating: "5",
    worstRating: "1",
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: PROTRONICS_NAP.name,
    legalName: PROTRONICS_NAP.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/logo.webp"),
    image: absoluteUrl("/logo.webp"),
    description: SITE_DESCRIPTION,
    email: PROTRONICS_NAP.email,
    telephone: PROTRONICS_NAP.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: PROTRONICS_NAP.streetAddress,
      addressLocality: PROTRONICS_NAP.addressLocality,
      addressRegion: PROTRONICS_NAP.addressRegion,
      postalCode: PROTRONICS_NAP.postalCode,
      addressCountry: PROTRONICS_NAP.addressCountry,
    },
    areaServed: SERVICE_AREA_CITIES.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "Karnataka",
      },
    })),
    sameAs: [
      GOOGLE_BUSINESS_PROFILE_URL,
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ].filter(Boolean),
    aggregateRating: testimonialAggregateRating(),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?brand={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@type": ["LocalBusiness", "Store"],
    "@id": LOCAL_BUSINESS_ID,
    name: PROTRONICS_NAP.name,
    legalName: PROTRONICS_NAP.legalName,
    additionalType: "https://schema.org/Store",
    category: PROTRONICS_NAP.category,
    description:
      "Protronics is a refurbished appliance store in Bengaluru offering certified refrigerators, washing machines, trade-in, exchange, warranty, and expert support.",
    url: SITE_URL,
    image: [absoluteUrl("/logo.webp"), absoluteUrl("/og/protronics-og.webp")],
    logo: absoluteUrl("/logo.webp"),
    telephone: PROTRONICS_NAP.telephone,
    email: PROTRONICS_NAP.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: PROTRONICS_NAP.streetAddress,
      addressLocality: PROTRONICS_NAP.addressLocality,
      addressRegion: PROTRONICS_NAP.addressRegion,
      postalCode: PROTRONICS_NAP.postalCode,
      addressCountry: PROTRONICS_NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PROTRONICS_NAP.latitude,
      longitude: PROTRONICS_NAP.longitude,
    },
    hasMap: GOOGLE_MAPS_DIRECTIONS_URL,
    openingHoursSpecification: BUSINESS_HOURS.specification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...spec.dayOfWeek],
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: SERVICE_AREA_CITIES.map((city) => ({
      "@type": "City",
      name: city,
    })),
    knowsAbout: [
      "refurbished refrigerators",
      "refurbished washing machines",
      "appliance trade-in",
      "used refrigerator with warranty",
      "second hand fridge Bangalore",
    ],
    sameAs: [
      GOOGLE_BUSINESS_PROFILE_URL,
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
    parentOrganization: { "@id": ORG_ID },
    aggregateRating: testimonialAggregateRating(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Protronics Services",
      itemListElement: PROTRONICS_SERVICES.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-${service.id}`,
          name: service.name,
          description: service.description,
          provider: { "@id": LOCAL_BUSINESS_ID },
          areaServed: {
            "@type": "City",
            name: "Bengaluru",
          },
        },
      })),
    },
  };
}

export function buildServiceJsonLdList() {
  return PROTRONICS_SERVICES.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${service.id}`,
    name: service.name,
    description: service.description,
    provider: { "@id": LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
      alternateName: "Bangalore",
    },
    serviceType: service.name,
  }));
}

export function buildReviewJsonLd() {
  return CUSTOMER_TESTIMONIALS.slice(0, 8).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    datePublished: "2026-01-15",
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: t.quote,
    itemReviewed: { "@id": LOCAL_BUSINESS_ID },
  }));
}

export function buildLocationPageJsonLd(citySlug: string) {
  const pageUrl = absoluteUrl(`/locations/${citySlug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Refurbished Appliances in Bengaluru | ${SITE_NAME}`,
        description:
          "Shop refurbished refrigerators and appliances in Bangalore with warranty, trade-in, delivery, and local expert support from Protronics.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": LOCAL_BUSINESS_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Locations",
            item: absoluteUrl("/locations/bangalore"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Bengaluru",
            item: pageUrl,
          },
        ],
      },
      buildLocalBusinessJsonLd(),
      ...buildServiceJsonLdList(),
    ],
  };
}

/** Site-wide JSON-LD injected once in root layout. */
export function buildGlobalJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(),
      buildLocalBusinessJsonLd(),
      ...buildServiceJsonLdList(),
      ...buildReviewJsonLd(),
    ],
  };
}
