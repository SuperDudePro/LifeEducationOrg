import { BackBar } from "../components/BackBar";
import { PageIntro } from "../components/PageIntro";
import { PageShell } from "../components/PageShell";
import { BY18_DATA } from "../data/by18";

export function By18Page() {
  return (
    <PageShell>
      <PageIntro pill="By 18" title={BY18_DATA.title} subtitle={BY18_DATA.subtitle} />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/" className="transition hover:text-emerald-900">← Back to Home</a>
          <a href="/floor" className="transition hover:text-emerald-900">View the Floor</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {BY18_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {BY18_DATA.groups.map((group) => (
        <section key={group.title} className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
          <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">{group.title}</h2>
          <ul className="mt-6 max-w-5xl space-y-3 text-lg leading-8 text-slate-700">
            {group.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
