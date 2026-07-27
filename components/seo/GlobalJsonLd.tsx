import { buildGlobalJsonLdGraph } from "@/lib/seo-json-ld";
import { safeJsonLdStringify } from "@/lib/safeJsonLd";

export default function GlobalJsonLd() {
  const graph = buildGlobalJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(graph) }}
    />
  );
}
