export function SiteNav() {
  const linkClass =
    "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10";

  return (
    <nav className="border-b border-white/10 bg-black px-6 py-4 md:px-14">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <a href="/" className={linkClass}>Home</a>
        <a href="/why" className={linkClass}>Why</a>
        <a href="/floor" className={linkClass}>Floor</a>
        <a href="/by-18" className={linkClass}>By 18</a>
        <a href="/domains" className={linkClass}>Domains</a>
        <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-400">
          Q&A soon
        </span>
      </div>
    </nav>
  );
}
