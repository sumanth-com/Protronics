import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPageContent from "@/components/local/LocationPageContent";
import { buildFaqJsonLd } from "@/lib/faq";
import { buildLocationPageJsonLd } from "@/lib/local/schema";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/local/locations";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: "Location Not Found | Protronics" };

  return buildPageMetadata({
    absoluteTitle: location.title,
    description: location.description,
    path: location.path,
    keywords: location.keywords,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LocationPageContent location={location} />
    </>
  );
}
