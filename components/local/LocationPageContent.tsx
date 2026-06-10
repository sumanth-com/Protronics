"use client";

import Link from "next/link";
import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import FAQAccordion from "@/components/faq/FAQAccordion";
import CtaButton from "@/components/ui/CtaButton";
import { BUSINESS } from "@/lib/contact";
import type { LocationPageConfig } from "@/lib/local/locations";
import { getLocationAreasForDisplay, getLocationServicesForDisplay } from "@/lib/local/locations";
import { cn } from "@/lib/utils";

type LocationPageContentProps = {
  location: LocationPageConfig;
};

export default function LocationPageContent({ location }: LocationPageContentProps) {
  const services = getLocationServicesForDisplay();
  const areas = getLocationAreasForDisplay();

  return (
    <main className="location-page flex-1 bg-theme-bg text-theme-fg">
      <section className="border-b border-theme-border bg-theme-bg">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:max-w-5xl">
          <p className="text-[11px] font-medium tracking-[0.22em] text-theme-fg-faint">
            LOCAL STORE · {location.alternateName.toUpperCase()}
          </p>
          <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight text-theme-fg sm:text-[36px]">
            {location.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-theme-fg-muted">
            {location.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/shop">Browse Refrigerators</CtaButton>
            <CtaButton href="/sell">Trade-In Valuation</CtaButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:max-w-5xl">
        <div className="space-y-4 text-[15px] leading-relaxed text-theme-fg-muted">
          {location.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-theme-border bg-theme-surface-card p-5">
            <h2 className="text-[13px] font-semibold tracking-tight text-theme-fg">Our Services</h2>
            <ul className="mt-3 space-y-2 text-[13px] text-theme-fg-muted">
              {services.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-theme-border bg-theme-surface-card p-5">
            <h2 className="text-[13px] font-semibold tracking-tight text-theme-fg">Areas We Serve</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-theme-fg-muted">
              {areas.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-theme-border bg-theme-bg-secondary">
        <div className="mx-auto grid max-w-5xl gap-0 lg:grid-cols-2">
          <div className="border-b border-theme-border p-6 lg:border-b-0 lg:border-r">
            <h2 className="text-[18px] font-semibold text-theme-fg">Visit &amp; Contact</h2>
            <p className="mt-2 text-[14px] text-theme-fg-muted">
              Find Protronics on Google Maps. Call or message us for same-day guidance across Bangalore.
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" aria-hidden />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" aria-hidden />
                <span className="flex flex-col gap-1">
                  {BUSINESS.phones.map((phone) => (
                    <a key={phone.display} href={phone.href} className="hover:text-theme-fg">
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href={BUSINESS.googleBusinessProfileUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border border-theme-border px-4 py-2.5",
                  "text-[13px] font-semibold text-theme-fg transition-colors hover:bg-theme-elevated",
                )}
              >
                Google Business Profile
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href={BUSINESS.mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border border-theme-border px-4 py-2.5",
                  "text-[13px] font-semibold text-theme-fg transition-colors hover:bg-theme-elevated",
                )}
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden />
                Directions
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <iframe
              title="Protronics on Google Maps — Bengaluru"
              src={BUSINESS.mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h2 className="text-center text-[20px] font-semibold text-theme-fg">Local FAQ</h2>
        <p className="mt-2 text-center text-[14px] text-theme-fg-muted">
          Common questions about second hand and refurbished appliances in Bangalore.
        </p>
        <div className="mt-6">
          <FAQAccordion faqs={location.localFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      <section className="border-t border-theme-border bg-theme-bg px-4 py-10 text-center sm:px-6">
        <p className="text-[14px] text-theme-fg-muted">
          Ready to shop local?{" "}
          <Link href="/contact" className="font-medium text-theme-accent underline-offset-2 hover:underline">
            Contact our Bengaluru team
          </Link>{" "}
          or browse the{" "}
          <Link href="/shop" className="font-medium text-theme-accent underline-offset-2 hover:underline">
            online shop
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
