import { getPostBySlug } from "./content/loadPosts";
import { DOMAINS } from "./data/domainsData";

const SITE_URL = "https://www.lifeeducation.org";
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

type JsonLd = Record<string, unknown>;

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}

function breadcrumb(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function pageName(pathname: string) {
  const names: Record<string, string> = {
    "/why": "Why LifeEducation Exists",
    "/floor": "The 18-Year-Old Floor",
    "/by-18": "By 18",
    "/domains": "The 10 Domains",
    "/posts": "Posts",
    "/qa": "LifeEducation Q&A",
    "/ask": "Ask LifeEducation",
    "/contact": "Contact",
  };
  return names[pathname] ?? "LifeEducation.org";
}

export function applyStructuredData(pathname: string, title: string, description: string) {
  const canonicalUrl = absoluteUrl(pathname === "/" ? "/" : pathname);
  const graph: JsonLd[] = [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "LifeEducation.org",
      url: `${SITE_URL}/`,
      description:
        "A capability-based education project focused on raising capable, self-directed humans.",
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "LifeEducation.org",
      description,
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];

  if (pathname.startsWith("/posts/")) {
    const slug = pathname.replace("/posts/", "");
    const post = getPostBySlug(slug);
    if (post) {
      const image = post.cardImage ?? post.heroImage;
      graph.push({
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        datePublished: post.publishedAt,
        ...(post.modifiedAt ? { dateModified: post.modifiedAt } : {}),
        author: { "@type": "Person", name: "Will Gayhart" },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
        ...(post.topic ? { articleSection: post.topic } : {}),
        ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
        ...(image ? { image: absoluteUrl(image) } : {}),
      });
      graph.push(
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Posts", path: "/posts" },
          { name: post.title, path: pathname },
        ]),
      );
    }
  } else if (pathname.startsWith("/domains/")) {
    const slug = pathname.replace("/domains/", "");
    const domain = DOMAINS.find((item) => item.slug === slug);
    if (domain) {
      graph.push({
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: domain.title,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@type": "DefinedTerm", name: domain.title },
      });
      graph.push(
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "The 10 Domains", path: "/domains" },
          { name: domain.title, path: pathname },
        ]),
      );
    }
  } else {
    const pageType = pathname === "/posts" || pathname === "/domains" ? "CollectionPage" : pathname === "/why" ? "AboutPage" : "WebPage";
    graph.push({
      "@type": pageType,
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
    });
    if (pathname !== "/") {
      graph.push(
        breadcrumb([
          { name: "Home", path: "/" },
          { name: pageName(pathname), path: pathname },
        ]),
      );
    }
  }

  let element = document.head.querySelector<HTMLScriptElement>("script[data-site-jsonld]");
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.siteJsonld = "true";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
