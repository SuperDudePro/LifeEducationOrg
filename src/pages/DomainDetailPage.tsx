import { BackBar } from "../components/BackBar";
import { PageIntro } from "../components/PageIntro";
import { PageShell } from "../components/PageShell";
import { DOMAINS } from "../data/domains";

export function DomainDetailPage({ slug }: { slug: string }) {
  const domain = DOMAINS.find((item) => item.slug === slug);

  if (!domain) {
    return (
      <PageShell>
        <PageIntro pill="Domain Detail" title="Domain not found" subtitle="That domain page does not exist yet." />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageIntro pill="Domain Detail" title={domain.title} subtitle="Broader map page, not the minimum contract." />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/domains" className="transition hover:text-emerald-900">← Back to Domains</a>
          <a href="/" className="transition hover:text-emerald-900">Back to Home</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        <p className="max-w-4xl text-xl leading-9 text-slate-200">
          This page shows the broader domain map: core outcomes, key competencies, and evidence examples. The Floor still defines the minimum contract.
        </p>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">Core Outcomes</h2>
        <ul className="mt-6 max-w-4xl space-y-3 text-lg leading-8 text-slate-700">
          {domain.coreOutcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-slate-300 bg-slate-100 px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">Key Competencies</h2>
        <ul className="mt-6 max-w-5xl space-y-3 text-lg leading-8 text-slate-700">
          {domain.competencies.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">Evidence Examples</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{domain.evidence}</p>
      </section>
    </PageShell>
  );
}
