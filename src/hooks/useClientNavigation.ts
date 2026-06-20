import { useEffect } from "react";
import { normalizePath } from "../utils/routing";

export function useClientNavigation(pathname: string, setPathname: (pathname: string) => void) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http") || href.startsWith("#")) return;

      const nextUrl = new URL(href, window.location.origin);
      if (nextUrl.origin !== window.location.origin) return;

      const nextPath = normalizePath(nextUrl.pathname);
      if (nextPath.includes(".")) return;

      event.preventDefault();
      if (nextPath !== pathname) {
        window.history.pushState({}, "", nextPath);
        setPathname(nextPath);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, setPathname]);
}
