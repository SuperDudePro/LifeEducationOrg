import { BackBar } from "../components/BackBar";
import { PageIntro } from "../components/PageIntro";
import { PageShell } from "../components/PageShell";
import { DOMAINS } from "../data/domains";

export function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title="10-Domain Learning Outcomes Framework" subtitle="Broader map, not a second contract" />
      <BackBar>
        <a href="/" className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-900">
          ← Back to Home
        </a>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        <p className="max-w-5xl text-xl leading-9 text-slate-200">
          The Floor defines the non-negotiable minimum. The Domains describe the fuller landscape: core outcomes, key competencies, and evidence examples.
        </p>
        <p className="mt-5 max-w-5xl text-xl leading-9 text-slate-200">
          Not everything here is required. The Floor remains the final word on what is mandatory.
        </p>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">The 10 Core Learning Domains</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DOMAINS.map((domain) => (
            <a
              key={domain.slug}
              href={`/domains/${domain.slug}`}
              className="rounded-[24px] bg-black px-5 py-5 text-white shadow-lg transition hover:-translate-y-[1px] hover:bg-zinc-900"
            >
              <div className="text-2xl">{domain.emoji}</div>
              <div className="mt-3 font-serif text-2xl leading-tight">{domain.title}</div>
              <div className="mt-3 text-sm leading-7 text-slate-300">Open full domain details</div>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
