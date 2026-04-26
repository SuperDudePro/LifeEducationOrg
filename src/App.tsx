import { useEffect, useMemo, useState } from "react";
import { TREE_FAVICON } from "./data/site";
import { DOMAINS } from "./data/domainsData";
import { normalizePath } from "./utils/routing";
import { HomePage } from "./pages/HomePage";
import { WhyPage } from "./pages/WhyPage";
import { By18Page } from "./pages/By18Page";
import { FloorPage } from "./pages/FloorPage";
import { DomainsPage } from "./pages/DomainsPage";
import { DomainDetailPage } from "./pages/DomainDetailPage";
import { QAPage } from "./pages/QAPage";
import { PostsPage } from "./pages/PostsPage";
import { PostPage } from "./pages/PostPage";
import { getPostBySlug } from "./content/loadPosts";

export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = TREE_FAVICON;
  }, []);

  const [pathname, setPathname] = useState<string>(() => normalizePath(window.location.pathname || "/"));

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(window.location.pathname || "/"));
    window.addEventListener("popstate", onPopState);

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
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  useEffect(() => {
    const defaultDescription =
      "LifeEducation.org is a lightweight operating system for raising capable, self-directed humans outside the default school script.";
    const metaMap: Record<string, { title: string; description: string }> = {
      "/": {
        title: "LifeEducation.org",
        description: defaultDescription,
      },
      "/why": {
        title: "Why LifeEducation.org Exists | LifeEducation.org",
        description:
          "The founding statement for LifeEducation: a framework for raising capable, self-directed humans with real-world judgment by 18.",
      },
      "/floor": {
        title: "The 18-Year-Old Floor | LifeEducation.org",
        description:
          "The non-negotiable minimum adulthood capability contract for LifeEducation.",
      },
      "/by-18": {
        title: "By 18: What You Can Do | LifeEducation.org",
        description:
          "A plain-language public translation of the LifeEducation Floor contract.",
      },
      "/domains": {
        title: "10 Domains | LifeEducation.org",
        description:
          "The broader LifeEducation capability map across communication, math, science, civics, ethics, finance, health, creativity, technology, and life skills.",
      },
      "/posts": {
        title: "Posts | LifeEducation.org",
        description:
          "Field notes and essays on building LifeEducation in real life.",
      },
      "/qa": {
        title: "LifeEducation Q&A | LifeEducation.org",
        description:
          "Plain answers to common questions and objections about the LifeEducation framework.",
      },
    };

    let meta = metaMap[pathname] ?? metaMap["/"];

    if (pathname.startsWith("/posts/")) {
      const slug = pathname.replace("/posts/", "");
      const post = getPostBySlug(slug);
      meta = post
        ? { title: `${post.title} | LifeEducation.org`, description: post.excerpt }
        : { title: "Post not found | LifeEducation.org", description: defaultDescription };
    } else if (pathname.startsWith("/domains/")) {
      const slug = pathname.replace("/domains/", "");
      const domain = DOMAINS.find((item) => item.slug === slug);
      meta = domain
        ? {
            title: `${domain.title} | LifeEducation.org`,
            description: `LifeEducation Domain ${domain.number}: ${domain.title}. Core outcomes, key competencies, and evidence examples.`,
          }
        : { title: "Domain not found | LifeEducation.org", description: defaultDescription };
    }

    document.title = meta.title;

    const setMeta = (selector: string, attr: "content" | "href", value: string, create?: () => HTMLMetaElement | HTMLLinkElement) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element && create) {
        element = create();
        document.head.appendChild(element);
      }
      element?.setAttribute(attr, value);
    };

    setMeta("meta[name='description']", "content", meta.description);
    setMeta("meta[property='og:title']", "content", meta.title);
    setMeta("meta[property='og:description']", "content", meta.description);
    setMeta("meta[name='twitter:title']", "content", meta.title);
    setMeta("meta[name='twitter:description']", "content", meta.description);
    setMeta("link[rel='canonical']", "href", `${window.location.origin}${pathname === "/" ? "/" : pathname}`, () => {
      const link = document.createElement("link");
      link.rel = "canonical";
      return link;
    });
  }, [pathname]);

  const page = useMemo(() => {
    if (pathname === "/why") return <WhyPage />;
    if (pathname === "/by-18") return <By18Page />;
    if (pathname === "/floor") return <FloorPage />;
    if (pathname === "/qa") return <QAPage />;
    if (pathname === "/posts") return <PostsPage />;
    if (pathname.startsWith("/posts/")) return <PostPage slug={pathname.replace("/posts/", "")} />;
    if (pathname === "/domains") return <DomainsPage />;
    if (pathname.startsWith("/domains/")) {
      return <DomainDetailPage slug={pathname.replace("/domains/", "")} />;
    }
    return <HomePage />;
  }, [pathname]);

  return <>{page}</>;
}
