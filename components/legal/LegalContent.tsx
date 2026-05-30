import type { LegalBlock, LegalSection } from "@/lib/legal/types";
import { cn } from "@/lib/utils";

function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="legal-body-p">{block.text}</p>;
    case "heading":
      return <h3 className="legal-body-h3">{block.text}</h3>;
    case "list":
      return (
        <ul className="legal-body-ul">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="legal-callout">
          {block.title ? <p className="legal-callout-title">{block.title}</p> : null}
          <p className={cn(block.title && "mt-1.5")}>{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

type LegalContentProps = {
  sections: LegalSection[];
};

export default function LegalContent({ sections }: LegalContentProps) {
  return (
    <article className="legal-article min-w-0">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={cn("legal-section scroll-mt-32", index > 0 && "mt-12 sm:mt-14")}
          aria-labelledby={`${section.id}-heading`}
        >
          <h2 id={`${section.id}-heading`} className="legal-section-title">
            <span className="legal-section-index">{String(index + 1).padStart(2, "0")}</span>
            {section.title}
          </h2>
          <div className="legal-section-body mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {section.blocks.map((block, blockIndex) => (
              <LegalBlockView key={`${section.id}-${blockIndex}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
