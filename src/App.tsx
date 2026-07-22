import { useEffect, useMemo, useState } from "react";
import { LongPostNav } from "./components/LongPostNav";
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
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { getPostBySlug } from "./content/loadPosts";
import { applyStructuredData } from "./structuredData";

const GA_TRACKING_ID = "G-XXC8QNBPH5";
const TRACKED_HOSTS = new Set(["lifeeducation.org", "www.lifeeducation.org"]);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const defaultDescription =
      "LifeEducation.org is a lightweight operating system for raising capable, self-directed humans without treating school as the default authority over education.";
    const metaMap: Record<string, { title: string; description: string }> = {
      "/": {
        title: "LifeEducation.org",
        description: defaultDescription,
      },
      "/why": {
        title: "Why LifeEducation.org Exists | LifeEducation.org",
        description:
          "The founding statement for LifeEducation: not anti-education, but anti school-as-default-authority, with real capability as the standard.",
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
        title: "The 10 Domains | LifeEducation.org",
        description:
          "The broader LifeEducation capability map across communication, math, science, civics, ethics, finance, health, creativity, technology, and life skills.",
      },
      "/posts": {
        title: "Posts | LifeEducation.org",
        description:
          "Field notes and essays on school legitimacy, the Floor, the Domains, and building LifeEducation in real life.",
      },
      "/qa": {
        title: "LifeEducation Q&A | LifeEducation.org",
        description:
          "Plain answers to common questions and objections, including the distinction between education, schooling, and school-as-default-authority.",
      },
      "/contact": {
        title: "Contact | LifeEducation.org",
        description:
          "Send questions, corrections, objections, examples, or serious feedback about LifeEducation.",
      },
    };

    let meta = metaMap[pathname] ?? metaMap["/"];

    const isKnownTopLevel = pathname === "/" || pathname in metaMap;

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
            description: `LifeEducation Domain ${domain.number}: ${domain.title}. The floor, the broader map, how it builds, and the essay.`,
          }
        : { title: "Domain not found | LifeEducation.org", description: defaultDescription };
    } else if (!isKnownTopLevel) {
      meta = { title: "Page not found | LifeEducation.org", description: defaultDescription };
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
    setMeta("link[rel='canonical']", "href", `https://www.lifeeducation.org${pathname === "/" ? "/" : pathname}`, () => {
      const link = document.createElement("link");
      link.rel = "canonical";
      return link;
    });
    applyStructuredData(pathname, meta.title, meta.description);

    if (TRACKED_HOSTS.has(window.location.hostname.toLowerCase())) {
      window.gtag?.("event", "page_view", {
        send_to: GA_TRACKING_ID,
        page_title: meta.title,
        page_path: `${pathname}${window.location.search}`,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  const page = useMemo(() => {
    if (pathname === "/") return <HomePage />;
    if (pathname === "/why") return <WhyPage />;
    if (pathname === "/by-18") return <By18Page />;
    if (pathname === "/floor") return <FloorPage />;
    if (pathname === "/qa") return <QAPage />;
    if (pathname === "/contact") return <ContactPage />;
    if (pathname === "/posts") return <PostsPage />;
    if (pathname.startsWith("/posts/")) return <PostPage slug={pathname.replace("/posts/", "")} />;
    if (pathname === "/domains") return <DomainsPage />;
    if (pathname.startsWith("/domains/")) return <DomainDetailPage slug={pathname.replace("/domains/", "")} />;
    return <NotFoundPage />;
  }, [pathname]);

  return (
    <>
      {page}
      <LongPostNav homeHref="/" postsHref="/posts" postsLabel="All posts" />
    </>
  );
}
