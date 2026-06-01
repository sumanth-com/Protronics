import { BUSINESS } from "@/lib/contact";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
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
    reviewCount: String(count),
    bestRating: "5",
    worstRating: "1",
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.webp"),
    image: absoluteUrl("/logo.webp"),
    description: SITE_DESCRIPTION,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [
      BUSINESS.whatsapp,
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
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
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl("/logo.webp"),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: BUSINESS.serviceAreas,
    parentOrganization: { "@id": ORG_ID },
    aggregateRating: testimonialAggregateRating(),
  };
}

export function buildReviewJsonLd() {
  return CUSTOMER_TESTIMONIALS.slice(0, 6).map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: t.quote,
    itemReviewed: { "@id": ORG_ID },
  }));
}

/** Site-wide JSON-LD injected once in root layout. */
export function buildGlobalJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(),
      buildLocalBusinessJsonLd(),
      ...buildReviewJsonLd(),
    ],
  };
}
