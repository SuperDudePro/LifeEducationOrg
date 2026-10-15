import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { ContentBlocks } from "../components/ContentBlocks";
import { SectionNav } from "../components/SectionNav";
import { AskCta } from "../components/AskCta";
import { FLOOR_DATA } from "../data/floorData";
import { DOMAINS } from "../data/domainsData";

export function FloorPage() {
  return (
    <PageShell>
      <PageIntro pill="The Floor" title={FLOOR_DATA.title} subtitle={FLOOR_DATA.subtitle} />
      <BackBar>
        <div className="back-link-row"><a href="/" className="back-link">← Back to Home</a><a href="/by-18" className="back-link">View By 18</a></div>
      </BackBar>
      <section className="doc-dark">
        {FLOOR_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      <SectionNav sections={FLOOR_DATA.sections} />
      {FLOOR_DATA.sections.map((section, index) => (
        <section key={section.id} id={section.id} className={index % 2 === 0 ? "doc-section" : "doc-section doc-section-alt"}>
          <h2 className="doc-section-title">{section.heading}</h2>
          {section.id === "domain-floor-capabilities" && <nav className="floor-domain-nav" aria-label="Jump to a Floor domain">{DOMAINS.map((domain) => <a key={domain.slug} href={`#floor-domain-${domain.number}`}>{domain.number}. {domain.title}</a>)}</nav>}
          <ContentBlocks blocks={section.blocks} floorDomainLinks={section.id === "domain-floor-capabilities"} />
        </section>
      ))}
      <section className="doc-section doc-section-alt"><p className="doc-section-text">For the plain-language adulthood target, <a href="/by-18">read By 18</a>. For the broader map beyond this minimum, <a href="/domains">explore the 10 Domains</a>.</p></section>
      <AskCta />
    </PageShell>
  );
}
