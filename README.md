# Protronics

**Premium Refurbished Appliances Marketplace**

Protronics is a production-ready ecommerce experience for certified refurbished refrigerators and home appliances. The site combines a premium storefront, trade-in flows, comparison tools, and serverless form handling—optimized for SEO, performance, and mobile-first shopping in Bangalore and across India.

**Live site:** [protronics.store](https://protronics.store)

---

## Features

- **Premium ecommerce experience** — Shop catalog, product detail, deals, and wishlist with a polished, brand-led UI
- **Refurbished refrigerators** — Category browsing, filters, and dynamic product pages with warranty messaging
- **Trade-in program** — Sell / exchange flow with estimator and WhatsApp handoff (`/sell`)
- **Product comparison** — Side-by-side value comparison for informed buying decisions
- **Responsive design** — Dedicated mobile navigation, carousels, and touch-friendly layouts
- **Dark & light theme** — System-aware theming via `next-themes`
- **Google Sheets form integration** — Contact, warranty, service requests, and trade-in leads without a backend API
- **SEO optimized** — Metadata, local keywords, canonical URLs, and rich structured data
- **Dynamic product pages** — Per-product titles, descriptions, Open Graph, and Product schema
- **Marketplace mobile experience** — Sticky filters, mobile shop toolbar, and optimized home/shop flows

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP, Lenis |
| Forms backend | Google Apps Script → Google Sheets |
| Hosting | [Vercel](https://vercel.com) |
| Icons | Lucide React |

---

## Installation

### Prerequisites

- **Node.js** 20+ and **npm**
- A Google account (for Apps Script / Sheets form backend)
- Optional: Vercel account for deployment

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Pro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and set your values:

   ```bash
   cp .env.local.example .env
   ```

   At minimum, set `NEXT_PUBLIC_FORM_ENDPOINT` after deploying Google Apps Script (see [Form Integration](#form-integration)).

4. **Run the development server**

```bash
npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

5. **Production build (optional)**

   ```bash
   npm run build
   npm start
   ```

   For type-check and lint only:

   ```bash
   npm run build:check
   ```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Yes (production) | Google Apps Script Web App `/exec` URL for form submissions |
| `NEXT_PUBLIC_FORM_ENDPOINT_URL` | Alias | Same as above; either name works |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL (e.g. `https://protronics.store`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics measurement ID |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL` | Optional | Google Business Profile link for local SEO & maps |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Optional | Embedded map iframe URL |
| `NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL` | Optional | Directions link (defaults to GBP URL) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console verification meta tag |
| `FORMS_REQUIRE_ENDPOINT=1` | CI only | Fail build if form endpoint is missing |

Example `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://protronics.store
NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```

NAP (name, address, phone) and local business data are centralized in `lib/local/business.ts`. Update that file once so contact pages, schema, and location content stay consistent.

---

## Project Structure

```
Pro/
├── app/                    # Next.js App Router — pages, layouts, metadata, API routes
│   ├── page.tsx            # Home
│   ├── shop/               # Catalog & category routes
│   ├── product/[slug]/     # Product detail pages
│   ├── sell/               # Trade-in / sell flow
│   ├── locations/[city]/   # Local SEO landing pages (e.g. Bangalore)
│   ├── contact/            # Contact & lead forms
│   ├── support/            # FAQ & support articles
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # sitemap.xml generation
├── components/             # React UI by feature (shop, hero, footer, forms, seo, …)
├── hooks/                  # Shared React hooks (forms, scroll, etc.)
├── lib/                    # Business logic, SEO, shop data, forms pipeline
│   ├── forms/              # Validators, transformers, Google Sheets client
│   ├── local/              # NAP, LocalBusiness schema, location pages
│   ├── seo.ts              # Page metadata helpers
│   └── shop.ts             # Product & category data
├── public/                 # Static assets, favicons, OG images, forms-endpoint.json
├── scripts/                # Build helpers, Apps Script source, image/SEO tooling
├── styles/                 # Global CSS & theme tokens
├── docs/                   # Extended documentation (e.g. forms)
└── assets/                 # Source images for conversion scripts
```

**Key conventions**

- **Routes** live under `app/`; shared UI under `components/`.
- **Data & SEO** live in `lib/` — avoid duplicating product or NAP strings in components.
- **Forms** POST directly to Apps Script from the browser (no Next.js form API required for production).

---

## SEO Features

| Feature | Implementation |
|---------|----------------|
| **robots.txt** | `app/robots.ts` — allows indexing; blocks `/api/`, `/_next/`, dev paths |
| **sitemap.xml** | `app/sitemap.ts` + `lib/seo-sitemap.ts` — static pages, shop categories, products, locations |
| **Structured data** | `lib/local/schema.ts` — Organization, LocalBusiness, Service, Review, Product, FAQ |
| **Open Graph & Twitter** | `lib/seo.ts` `buildPageMetadata()` — OG images, locale `en_IN`, canonical URLs |
| **Schema markup** | `components/seo/GlobalJsonLd.tsx` (site-wide) + per-page JSON-LD on home, shop, products, locations |
| **Local SEO** | `/locations/bangalore`, NAP consistency, Maps embed, GBP links, Bangalore keyword targeting |
| **Dynamic product SEO** | `lib/product-detail.ts` — titles, descriptions, Product + AggregateRating schema |
| **Favicons & manifest** | `public/site.webmanifest`, generated favicons (`npm run seo:assets`) |

---

## Performance Features

- **Image optimization** — `next/image` with AVIF/WebP formats, responsive sizes, and blur placeholders where configured
- **Lazy loading** — Maps and below-the-fold sections load on intersection; `loading="lazy"` on embeds
- **Code splitting** — `next/dynamic` for heavy homepage and contact sections
- **Route prefetching** — Next.js `<Link>` prefetch for faster in-app navigation
- **Package optimization** — `optimizePackageImports` for `lucide-react`, `framer-motion`, and `gsap`
- **Deferred mounting** — Non-critical UI wrapped in `DeferredMount` on the homepage

---

## Form Integration

Forms submit **directly from the browser** to Google Apps Script—no Node server or database required. Submissions append rows to Google Sheets with unlimited volume (subject to Google quotas).

### Quick setup

1. Create a Google Spreadsheet.
2. Open **Extensions → Apps Script** and paste `scripts/Code.gs`.
3. Run **`setupSheets()`**, then **`setupEmailNotifications()`** (edit the email in that function if needed).
4. **Deploy → Web app** — Execute as **Me**, Who has access: **Anyone**.
5. Copy the deployment **`/exec`** URL.
6. Set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env` and on Vercel.
7. Run `npm run build` — generates `public/forms-endpoint.json` for runtime health checks.

Supported flows include contact, warranty, service requests, and trade-in leads. Each form type maps to a dedicated sheet tab via `lib/forms/`. Email alerts are sent by Apps Script after each successful row.

**Full guide:** [docs/FORMS.md](docs/FORMS.md)

---

## Deployment

### Deploy to Vercel

1. Push the repository to GitHub (or connect your Git provider).
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Add environment variables under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_FORM_ENDPOINT`
   - `NEXT_PUBLIC_SITE_URL`
   - Optional: Analytics, Google Maps/GBP URLs, Search Console verification
5. Deploy. Vercel runs `npm run build` by default.

### Post-deploy checklist

- Confirm forms submit and rows appear in Google Sheets.
- Submit `sitemap.xml` in Google Search Console (`https://your-domain/sitemap.xml`).
- Verify structured data with [Rich Results Test](https://search.google.com/test/rich-results).
- Replace placeholder NAP/phone in `lib/local/business.ts` with your live business details.
- Set real Google Business Profile and Maps embed URLs in environment variables.

### Useful scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Lint, validate forms env, write endpoint JSON, production build |
| `npm run build:check` | Lint + TypeScript check |
| `npm run seo:assets` | Generate favicons and OG image assets |
| `npm run forms:write-endpoint` | Regenerate `public/forms-endpoint.json` |

---

## License

This project is **private** and proprietary to Protronics. All rights reserved. Unauthorized copying, distribution, or commercial use is not permitted without explicit permission from the owner.

---

## Additional documentation

- [docs/FORMS.md](docs/FORMS.md) — Form architecture, payload format, troubleshooting, and adding new forms
