import { BackBar } from "../components/BackBar";
import { PageIntro } from "../components/PageIntro";
import { PageShell } from "../components/PageShell";
import { RichSection } from "../components/RichSection";
import { WHY_DATA } from "../data/why";

export function WhyPage() {
  return (
    <PageShell>
      <PageIntro pill="The Why" title={WHY_DATA.title} subtitle={WHY_DATA.subtitle} />
      <BackBar>
        <a href="/" className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-900">
          ← Back to Home
        </a>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {WHY_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {WHY_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
    </PageShell>
  );
}
