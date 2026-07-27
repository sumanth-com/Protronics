import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPageContent from "@/components/local/LocationPageContent";
import { buildFaqJsonLd } from "@/lib/faq";
import { buildLocationPageJsonLd } from "@/lib/local/schema";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/local/locations";
import { buildPageMetadata } from "@/lib/seo";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) {
    return buildPageMetadata({
      absoluteTitle: "Location Not Found | Protronics",
      description: "This Protronics service area page could not be found.",
      path: "/locations/bangalore",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    absoluteTitle: location.title,
    description: location.description,
    path: location.path,
    keywords: location.keywords.slice(0, 6),
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const locationJsonLd = buildLocationPageJsonLd(city);
  const faqJsonLd = buildFaqJsonLd(location.localFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(locationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      <LocationPageContent location={location} />
    </>
  );
}
