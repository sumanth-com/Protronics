import type { Metadata } from "next";
import TradeInPage from "@/components/trade-in/TradeInPage";
import { tradeInPageJsonLd } from "@/lib/trade-in";
import { buildPageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.sell.title,
  description: PAGE_SEO.sell.description,
  path: PAGE_SEO.sell.path,
  keywords: [...PAGE_SEO.sell.keywords],
});

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tradeInPageJsonLd) }}
      />
      <TradeInPage />
    </>
  );
}
