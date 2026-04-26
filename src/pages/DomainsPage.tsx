import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { DOMAINS } from "../data/domainsData";

export function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title="10-Domain Learning Outcomes Framework" subtitle="Broader map, not a second contract" />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">The Floor defines the non-negotiable minimum. The Domains describe the fuller landscape: core outcomes, key competencies, and evidence examples.</p>
        <p className="doc-dark-text">Not everything here is required. The Floor remains the final word on what is mandatory.</p>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">The 10 Core Learning Domains</h2>
        <div className="domain-page-grid">
          {DOMAINS.map((domain) => (
            <a key={domain.slug} href={`/domains/${domain.slug}`} className="domain-page-card">
              <div className="domain-page-card-number">{domain.number}</div>
              <div className="domain-page-card-title">{domain.title}</div>
              <div className="domain-page-card-note">Open full domain details</div>
            </a>
          ))}
        </div>
      </section>
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}
