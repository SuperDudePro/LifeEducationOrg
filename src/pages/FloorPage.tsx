import { BackBar } from "../components/BackBar";
import { PageIntro } from "../components/PageIntro";
import { PageShell } from "../components/PageShell";
import { RichSection } from "../components/RichSection";
import { FLOOR_DATA } from "../data/floor";

export function FloorPage() {
  return (
    <PageShell>
      <PageIntro pill="The Floor" title={FLOOR_DATA.title} subtitle={FLOOR_DATA.subtitle} notice={FLOOR_DATA.notice} />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/" className="transition hover:text-emerald-900">← Back to Home</a>
          <a href="/by-18" className="transition hover:text-emerald-900">View By 18</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {FLOOR_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {FLOOR_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
    </PageShell>
  );
}
