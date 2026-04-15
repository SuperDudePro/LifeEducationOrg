export function PageIntro({
  pill,
  title,
  subtitle,
  notice,
}: {
  pill: string;
  title: string;
  subtitle?: string;
  notice?: string;
}) {
  return (
    <section className="border-b border-slate-300 bg-slate-100 px-6 py-10 md:px-14 md:py-12">
      <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
        {pill}
      </div>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-slate-900 md:text-6xl">{title}</h1>
      {subtitle ? <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p> : null}
      {notice ? (
        <div className="mt-6 max-w-4xl rounded-[22px] border border-amber-300 bg-amber-50 px-5 py-4 text-base leading-8 text-amber-900">
          {notice}
        </div>
      ) : null}
    </section>
  );
}
