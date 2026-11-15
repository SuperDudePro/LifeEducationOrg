import { NAV_ITEMS } from "../data/site";
import { useState } from "react";

export function SiteNav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = NAV_ITEMS.map((item) => {
    const isCurrent = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(`${item.href}/`));
    return <a key={item.href} href={item.href} className={isCurrent ? "site-nav-link site-nav-link-active" : "site-nav-link"} aria-current={isCurrent ? "page" : undefined}>{item.label}</a>;
  });
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-nav-inner">
        {links}
      </div>
      <div className="site-nav-mobile">
        <button type="button" className="site-nav-menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav-mobile-links" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? "Close menu" : "Explore site"} <span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
        {menuOpen && <div id="site-nav-mobile-links" className="site-nav-mobile-links">{links}</div>}
      </div>
    </nav>
  );
}
