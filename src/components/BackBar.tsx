import type { ReactNode } from "react";

export function BackBar({ children }: { children: ReactNode }) {
  return <section className="border-b border-slate-300 bg-white px-6 py-5 md:px-14">{children}</section>;
}
