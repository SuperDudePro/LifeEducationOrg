import type { ReactNode } from "react";
import { BrandHeader } from "./BrandHeader";
import { SiteNav } from "./SiteNav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black p-3 md:p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-100 to-slate-200 shadow-2xl">
        <BrandHeader />
        <SiteNav />
        {children}
      </div>
    </div>
  );
}
