/** Escape JSON for embedding in <script> so `</script>` cannot break out. */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
