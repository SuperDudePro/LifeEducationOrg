import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { SectionNav } from "../components/SectionNav";
import { DOMAINS } from "../data/domainsData";
import { FLOOR_BY_DOMAIN } from "../data/floorByDomain";
import { AGE_BAND_BY_DOMAIN } from "../data/ageBandByDomain";
import { getPostForDomain, getPostImage } from "../content/loadPosts";

export function DomainDetailPage({ slug }: { slug: string }) {
  const domain = DOMAINS.find((item) => item.slug === slug);

  if (!domain) {
    return (
      <PageShell>
        <PageIntro
          pill="Domain Detail"
          title="Domain not found"
          subtitle="That domain page does not exist yet."
        />
        <BackBar>
          <a href="/domains" className="back-link">← Back to Domains</a>
        </BackBar>
      </PageShell>
    );
  }

  const floor = FLOOR_BY_DOMAIN.find((item) => item.number === domain.number);
  const ageBands = AGE_BAND_BY_DOMAIN.find((item) => item.number === domain.number);
  const essay = getPostForDomain(domain.number);
  const essayImage = essay ? getPostImage(essay, "card") : undefined;

  const sections = [
    floor ? { id: "floor", heading: "The Floor" } : null,
    { id: "map", heading: "The Broader Map" },
    ageBands ? { id: "runway", heading: "How It Builds" } : null,
    essay ? { id: "essay", heading: "The Essay" } : null,
  ].filter((s): s is { id: string; heading: string } => s !== null);

  return (
    <PageShell>
      <PageIntro
        pill={`Domain ${domain.number}`}
        title={domain.title}
        subtitle="The full picture for this domain: the non-negotiable floor, the broader capability map, how it builds over childhood, and the essay."
      />
      <BackBar>
        <div className="back-link-row">
          <a href="/domains" className="back-link">← Back to Domains</a>
          <a href="/" className="back-link">Back to Home</a>
        </div>
      </BackBar>

      <SectionNav sections={sections} />

      {floor ? (
        <section className="doc-section domain-floor" id="floor">
          <h2 className="doc-section-title">The Floor for This Domain</h2>
          <p className="doc-section-text">
            The non-negotiable minimum. This is the contract, not the menu — what a
            floor-complete 18-year-old must actually be able to do.
          </p>
          <p className="domain-layer-source">From the LifeEducation Floor (v2.4).</p>
          <ul className="doc-list">
            {floor.canDo.map((item) => (
              <li key={item} className="doc-list-item">
                <span className="doc-list-dot" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="domain-notfloor">
            <div className="domain-notfloor-label">Not on the floor</div>
            <ul className="domain-notfloor-list">
              {floor.notOnFloor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="doc-section doc-section-alt" id="map">
        <h2 className="doc-section-title">The Broader Map</h2>
        <p className="doc-section-text">
          The fuller landscape this domain engages over time. Broader than the floor —
          inclusion here does not by itself make a competency mandatory.
        </p>
        <p className="domain-layer-source">From the 10-Domain Framework (v1.6).</p>
        <h3 className="doc-subheading-small">Core Outcomes</h3>
        <ul className="doc-list">
          {domain.coreOutcomes.map((item) => (
            <li key={item} className="doc-list-item">
              <span className="doc-list-dot" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="doc-subheading-small">Key Competencies</h3>
        <ul className="doc-list doc-list-columns">
          {domain.competencies.map((item) => (
            <li key={item} className="doc-list-item">
              <span className="doc-list-dot" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="doc-subheading-small">Evidence Examples</h3>
        <p className="doc-section-text">{domain.evidence}</p>
      </section>

      {ageBands ? (
        <section className="doc-section" id="runway">
          <h2 className="doc-section-title">How It Builds</h2>
          <p className="doc-section-text">{ageBands.runwayNote}</p>
          <p className="domain-layer-source">
            From the Age-Band Scaffolding (v0.6). Written for adults: "on track" means a
            normal healthy trajectory toward the floor, not gifted or ahead. "Red flags"
            are persistent patterns worth investigating, not verdicts.
          </p>
          <div className="domain-bands">
            {ageBands.bands.map((band, index) => (
              <details key={band.band} className="domain-band" open={index === ageBands.bands.length - 1}>
                <summary className="domain-band-summary">{band.band}</summary>
                <div className="domain-band-body">
                  <div className="domain-band-group">
                    <h4 className="domain-band-group-title">On track</h4>
                    <ul className="doc-list">
                      {band.onTrack.map((item) => (
                        <li key={item} className="doc-list-item">
                          <span className="doc-list-dot" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="domain-band-group">
                    <h4 className="domain-band-group-title">Worth investigating</h4>
                    <ul className="doc-list">
                      {band.redFlags.map((item) => (
                        <li key={item} className="doc-list-item">
                          <span className="doc-list-dot domain-list-dot-flag" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="domain-band-building">
                    <span className="domain-band-building-label">What's building: </span>
                    {band.building}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {essay ? (
        <section className="doc-section doc-section-alt" id="essay">
          <h2 className="doc-section-title">The Essay</h2>
          <a className="domain-essay-card" href={`/posts/${essay.slug}`}>
            {essayImage ? (
              <div className="domain-essay-media">
                <img src={essayImage.src} alt={essayImage.alt} loading="lazy" decoding="async" />
              </div>
            ) : null}
            <div className="domain-essay-body">
              <div className="domain-essay-kicker">Long-form</div>
              <div className="domain-essay-title">{essay.title}</div>
              <p className="domain-essay-excerpt">{essay.excerpt}</p>
              <span className="domain-essay-link">Read the full essay →</span>
            </div>
          </a>
        </section>
      ) : null}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-text">© LifeEducation.org</div>
          <a className="footer-link" href="/contact">Contact</a>
        </div>
      </footer>
    </PageShell>
  );
}
