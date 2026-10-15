import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { BY18_DATA } from "../data/by18Data";
import { DOMAINS } from "../data/domainsData";

const sections = [
  { id: "run-your-life", domains: [10, 4] },
  { id: "communication-relationships", domains: [1, 5] },
  { id: "thinking-evidence", domains: [3, 2] },
  { id: "power-society", domains: [4] },
  { id: "money-value", domains: [6] },
  { id: "health", domains: [7] },
  { id: "technology", domains: [9] },
  { id: "making-creating", domains: [8] },
  { id: "ethics-values", domains: [5] },
];

export function By18Page() {
  return (
    <PageShell>
      <PageIntro pill="By 18" title={BY18_DATA.title} subtitle={BY18_DATA.subtitle} />
      <BackBar><div className="back-link-row"><a href="/" className="back-link">← Back to Home</a><a href="/floor" className="back-link">Read the formal Floor</a></div></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">{BY18_DATA.thesis}</p>
        {BY18_DATA.intro.map((paragraph) => <p key={paragraph} className="doc-dark-text">{paragraph}</p>)}
        <h2 className="doc-dark-text doc-dark-lead">{BY18_DATA.lead}</h2>
      </section>
      <nav className="by18-toc doc-section" aria-label="Jump to capability areas">
        <h2 className="doc-section-title">Explore the nine capability areas</h2>
        <ol className="by18-toc-list">
          {BY18_DATA.groups.map((group, index) => <li key={group.title}><a href={`#${sections[index].id}`}>{group.title}</a></li>)}
        </ol>
      </nav>
      {BY18_DATA.groups.map((group, index) => (
        <section key={group.title} id={sections[index].id} className={`doc-section ${index % 2 ? "doc-section-medium" : "doc-section-light"}`}>
          <h2 className="doc-section-title">{group.title}</h2>
          <ul className="doc-list">
            {group.items.map((item) => (
              <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item.replace(/\s*\(D\d+(?:, D\d+)*\)$/, "")}</span></li>
            ))}
          </ul>
          <p className="by18-related">Explore related domains: {sections[index].domains.map((number, linkIndex) => {
            const domain = DOMAINS.find((d) => Number(d.number) === number);
            return domain ? <span key={domain.slug}>{linkIndex > 0 ? " · " : ""}<a href={`/domains/${domain.slug}`}>{domain.title}</a></span> : null;
          })}</p>
        </section>
      ))}
      <section className="doc-section doc-section-alt">
        {BY18_DATA.closing.map((paragraph) => <p key={paragraph} className="doc-section-text doc-closing-text">{paragraph.replace(/\s*\(D\d+(?:, D\d+)*\)$/, "")}</p>)}
        <p className="doc-section-text">The Floor is the minimum. <a href="/domains">Explore the 10 Domains</a> for the broader map of learning and possibility.</p>
      </section>
    </PageShell>
  );
}
