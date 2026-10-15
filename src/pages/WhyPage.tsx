import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { RichSection } from "../components/RichSection";
import { SectionNav } from "../components/SectionNav";
import { AskCta } from "../components/AskCta";
import { WHY_DATA } from "../data/whyData";

export function WhyPage() {
  return (
    <PageShell>
      <PageIntro pill="The Why" title={WHY_DATA.title} subtitle={WHY_DATA.subtitle} />
      <BackBar><div className="back-link-row"><a href="/" className="back-link">← Back to Home</a><a href="/by-18" className="back-link">Explore By 18</a></div></BackBar>
      <section className="doc-dark">
        {WHY_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      <SectionNav sections={WHY_DATA.sections} />
      {WHY_DATA.sections.map((section, index) => (
        <section key={section.id} id={section.id}>
          <RichSection {...section} className={index % 2 === 0 ? "doc-section-light" : "doc-section-medium"} />
          {section.id === "capable-by-18" && <div className="doc-section doc-section-alt"><p className="doc-section-text">See the public benchmark: <a href="/by-18">the real-life skills young adults should have by 18</a>. For the non-negotiable standard, read <a href="/floor">the 18-Year-Old Floor</a>.</p></div>}
          {section.id === "three-layers" && <div className="doc-section doc-section-alt"><p className="doc-section-text">Explore <a href="/domains">the 10 Domains</a> to see the broader map of human capability.</p></div>}
        </section>
      ))}
      <section className="doc-section doc-section-alt"><h2 className="doc-section-title">Questions About This Approach?</h2><p className="doc-section-text">Explore the <a href="/qa">LifeEducation Q&A</a> for the most important distinctions and objections.</p></section>
      <AskCta />
    </PageShell>
  );
}
