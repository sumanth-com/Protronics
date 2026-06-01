import { buildGlobalJsonLdGraph } from "@/lib/seo-json-ld";

export default function GlobalJsonLd() {
  const graph = buildGlobalJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
