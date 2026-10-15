import type { ContentBlock } from "../types";
import { DOMAINS } from "../data/domainsData";

export function ContentBlocks({ blocks, floorDomainLinks = false }: { blocks: ContentBlock[]; floorDomainLinks?: boolean }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={`${block.text}-${index}`} className="doc-section-text">{block.text}</p>;
        }

        if (block.type === "subheading") {
          const levelClass = block.level && block.level >= 3 ? "doc-subheading doc-subheading-small" : "doc-subheading";
          const match = floorDomainLinks ? block.text.match(/^Domain (\d+) — /) : null;
          const domain = match ? DOMAINS.find((item) => item.number === match[1]) : undefined;
          return <div key={`${block.text}-${index}`}>
            {block.level && block.level >= 3 ? <h4 className={levelClass}>{block.text}</h4> : <h3 id={domain ? `floor-domain-${domain.number}` : undefined} className={levelClass}>{block.text}</h3>}
            {domain && <p className="floor-domain-link"><a href={`/domains/${domain.slug}`}>Explore {domain.title}</a></p>}
          </div>;
        }

        return (
          <ul key={`list-${index}`} className="doc-list">
            {block.items.map((item) => (
              <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item}</span></li>
            ))}
          </ul>
        );
      })}
    </>
  );
}
