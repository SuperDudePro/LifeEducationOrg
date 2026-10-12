import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { AskCta } from "../components/AskCta";
import { DOMAINS, DOMAINS_META } from "../data/domainsData";
import { DOMAIN_PAGE_COPY } from "../data/domainPageCopy";

export function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title="Ten Areas of Real-World Capability" subtitle="Communication, practical math, scientific thinking, civic knowledge, judgment, money, health, creativity, technology, and living independently." />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">What should an education prepare a young person to do? LifeEducation uses ten domains to make sure entire areas of adulthood are not overlooked, from reading a contract to evaluating evidence or running a project.</p>
        <p className="doc-dark-text">The <a href="/floor">18-Year-Old Floor</a> defines what must be demonstrated by 18. The domains are the wider map, not ten additional mandatory curricula. See <a href="/by-18">what a capable young adult should be able to do</a> for the plain-language destination.</p>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">Foundational Principles</h2>
        <ul className="doc-list">
          {DOMAINS_META.principles.map((principle) => (
            <li key={principle} className="doc-list-item"><span className="doc-list-dot" /><span>{principle}</span></li>
          ))}
        </ul>
      </section>
      <section className="doc-section doc-section-alt">
        <h2 className="doc-section-title">The 10 Core Learning Domains</h2>
        <div className="domain-page-grid">
          {DOMAINS.map((domain) => (
            <a key={domain.slug} href={`/domains/${domain.slug}`} className="domain-page-card">
              <div className="domain-page-card-number">{domain.number}</div>
              <div className="domain-page-card-title">{domain.title}</div>
              <div className="domain-page-card-note">{DOMAIN_PAGE_COPY[domain.slug]?.seoTitle ?? "Explore this capability"}</div>
            </a>
          ))}
        </div>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">Domain Recap</h2>
        <ul className="doc-list">
          {DOMAINS_META.recap.map((item) => (
            <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <section className="doc-section doc-section-alt">
        <h2 className="doc-section-title">Equity &amp; Access</h2>
        {DOMAINS_META.appendix.map((paragraph) => (
          <p key={paragraph} className="doc-section-text">{paragraph}</p>
        ))}
      </section>
      <AskCta />
    </PageShell>
  );
}
