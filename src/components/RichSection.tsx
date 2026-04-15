export function RichSection({
  heading,
  body,
  bullets,
  footer,
}: {
  heading: string;
  body?: string[];
  bullets?: string[];
  footer?: string;
}) {
  return (
    <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
      <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">{heading}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
          {paragraph}
        </p>
      ))}
      {bullets?.length ? (
        <ul className="mt-5 max-w-4xl space-y-3 text-lg leading-8 text-slate-700">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {footer ? <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{footer}</p> : null}
    </section>
  );
}
