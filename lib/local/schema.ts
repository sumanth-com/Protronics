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

export { ORG_ID, LOCAL_BUSINESS_ID, WEBSITE_ID };

function testimonialAggregateRating() {
  const reviews = CUSTOMER_TESTIMONIALS;
  let total = 0;
  for (const t of reviews) {
    total += t.rating ?? 5;
  }
  const count = reviews.length;
  const avg = total / Math.max(count, 1);
  return {
    "@type": "AggregateRating" as const,
    ratingValue: avg.toFixed(1),
    reviewCount: String(count),
    bestRating: "5",
    worstRating: "1",
  };
}

/** Only real profile URLs — never placeholder social homepages. */
function organizationSameAs() {
  const links = [GOOGLE_BUSINESS_PROFILE_URL];
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  if (instagram) links.push(instagram);
  if (facebook) links.push(facebook);
  return links.filter(Boolean);
}

function areaServedPlaces() {
  return SERVICE_AREA_CITIES.map((name) => ({
    "@type": name === "Bengaluru" ? "City" : "Place",
    name,
    ...(name !== "Bengaluru"
      ? {
          containedInPlace: {
            "@type": "City",
            name: "Bengaluru",
            alternateName: "Bangalore",
          },
        }
      : { alternateName: "Bangalore" }),
  }));
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
    telephone: PROTRONICS_NAP.telephoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: PROTRONICS_NAP.streetAddress,
      addressLocality: PROTRONICS_NAP.addressLocality,
      addressRegion: PROTRONICS_NAP.addressRegion,
      postalCode: PROTRONICS_NAP.postalCode,
      addressCountry: PROTRONICS_NAP.addressCountry,
    },
    areaServed: areaServedPlaces(),
    sameAs: organizationSameAs(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PROTRONICS_NAP.telephoneE164,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"],
      },
      {
        "@type": "ContactPoint",
        telephone: PROTRONICS_NAP.telephoneSecondaryE164,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"],
      },
    ],
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
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
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
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: [absoluteUrl("/logo.webp"), absoluteUrl("/og/protronics-og.webp")],
    logo: absoluteUrl("/logo.webp"),
    telephone: PROTRONICS_NAP.telephoneE164,
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
    areaServed: areaServedPlaces(),
    knowsAbout: [
      "refurbished refrigerators",
      "refurbished washing machines",
      "appliance trade-in",
      "used refrigerator with warranty",
      "second hand fridge Bangalore",
    ],
    sameAs: organizationSameAs(),
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
            alternateName: "Bangalore",
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
  return CUSTOMER_TESTIMONIALS.map((t, index) => ({
    "@type": "Review",
    "@id": `${SITE_URL}/#review-${index + 1}`,
    author: { "@type": "Person", name: t.name },
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
            name: "Bengaluru",
            item: pageUrl,
          },
        ],
      },
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
