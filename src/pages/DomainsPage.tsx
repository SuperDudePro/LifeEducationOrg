import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { AskCta } from "../components/AskCta";
import { DOMAINS } from "../data/domainsData";
import { DOMAINS_HUB } from "../data/domainsHub";

export function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title={DOMAINS_HUB.heading} subtitle={DOMAINS_HUB.subtitle} />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">{DOMAINS_HUB.introduction}</p>
        <p className="doc-dark-text">{DOMAINS_HUB.distinction}</p>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">Start with the adulthood target</h2>
        <div className="domain-page-grid">
          <a href="/by-18" className="domain-page-card"><span className="domain-page-card-title">What young adults should be able to do by 18</span></a>
          <a href="/floor" className="domain-page-card"><span className="domain-page-card-title">The 18-Year-Old Floor</span></a>
        </div>
      </section>
      <section className="doc-section doc-section-alt">
        <h2 className="doc-section-title">The 10 Areas of Capability</h2>
        <div className="domain-page-grid">
          {DOMAINS.map((domain) => (
            <a key={domain.slug} href={`/domains/${domain.slug}`} className="domain-page-card">
              <div className="domain-page-card-number">{domain.number}</div>
              <div className="domain-page-card-title">{domain.title}</div>
              <div className="domain-page-card-note">{DOMAINS_HUB.cards[domain.slug as keyof typeof DOMAINS_HUB.cards]}</div>
            </a>
          ))}
        </div>
      </section>
      <AskCta />
    </PageShell>
  );
}
