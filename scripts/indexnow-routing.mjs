const ROUTE_BY_FILE = new Map([
  ["src/pages/HomePage.tsx", ["/"]],
  ["src/data/homeFaq.ts", ["/"]],
  ["src/data/homeFaqData.ts", ["/"]],
  ["src/pages/WhyPage.tsx", ["/why"]],
  ["src/data/why.ts", ["/why"]],
  ["src/data/whyData.ts", ["/why"]],
  ["src/pages/FloorPage.tsx", ["/floor"]],
  ["src/data/floor.ts", ["/floor"]],
  ["src/data/floorData.ts", ["/floor"]],
  ["src/pages/By18Page.tsx", ["/by-18"]],
  ["src/data/by18.ts", ["/by-18"]],
  ["src/data/by18Data.ts", ["/by-18"]],
  ["src/pages/DomainsPage.tsx", ["/domains"]],
  ["src/pages/QAPage.tsx", ["/qa"]],
  ["src/data/qaData.ts", ["/qa"]],
  ["src/pages/ContactPage.tsx", ["/contact"]],
  ["src/pages/PostsPage.tsx", ["/posts"]],
  ["public/lifeeducation_tree_source.webp", ["/"]],
  ["public/lifeeducation_break_navigator.webp", ["/"]],
  ["public/site_break_02_contact_desk.webp", ["/"]],
]);

const NON_PUBLIC_PATTERNS = [
  /^\.github\//,
  /^api\//,
  /^test\//,
  /^scripts\//,
  /^docs?\//,
  /(^|\/)[^/]+\.md$/i,
  /^public\/deployment\.json$/,
  /^public\/sitemap\.xml$/,
  /^public\/61ce7fc9035e19de0a179e9c02972623\.txt$/,
  /^src\/pages\/AskPage\.tsx$/,
  /^src\/styles\/ask\.css$/,
  /^package(?:-lock)?\.json$/,
  /^tsconfig(?:\.[^.]+)?\.json$/,
  /^eslint\.config\.js$/,
  /^CODE_CLEANUP_NOTES\.md$/,
];

const BROAD_PUBLIC_PATTERNS = [
  /^src\/App\.tsx$/,
  /^src\/main\.tsx$/,
  /^src\/structuredData\.ts$/,
  /^src\/types\.ts$/,
  /^src\/utils\//,
  /^src\/components\//,
  /^src\/styles\//,
  /^src\/data\/site\.ts$/,
  /^src\/assets\//,
  /^index\.html$/,
  /^redirects\.json$/,
  /^vercel\.json$/,
  /^vite\.config\.ts$/,
  /^public\/(?!deployment\.json$|sitemap\.xml$|61ce7fc9035e19de0a179e9c02972623\.txt$)/,
];

function addPaths(selection, paths) {
  for (const path of paths) selection.paths.add(path);
}

export function selectIndexNowRoutes(changedFiles, eventName = "push") {
  if (eventName === "workflow_dispatch" || changedFiles === null) {
    return { mode: "full", paths: new Set() };
  }
  if (!changedFiles?.length) return { mode: "none", paths: new Set() };

  const selection = { mode: "partial", paths: new Set() };

  for (const file of changedFiles) {
    const normalized = String(file).replaceAll("\\", "/");
    const postMatch = normalized.match(/^src\/content\/posts\/([^/]+)\//);
    if (postMatch) {
      addPaths(selection, ["/", "/posts", `/posts/${postMatch[1]}`]);
      continue;
    }

    if (
      normalized === "src/content/loadPosts.ts"
      || normalized === "src/content/postTypes.ts"
      || normalized === "src/pages/PostPage.tsx"
    ) {
      addPaths(selection, ["/", "/posts", "@posts"]);
      continue;
    }

    if (
      normalized === "src/data/domains.ts"
      || normalized === "src/data/domainsData.ts"
    ) {
      addPaths(selection, ["/", "/domains", "@domains"]);
      continue;
    }

    if (
      normalized === "src/pages/DomainDetailPage.tsx"
      || normalized === "src/data/floorByDomain.ts"
      || normalized === "src/data/ageBandByDomain.ts"
    ) {
      addPaths(selection, ["/domains", "@domains"]);
      continue;
    }

    const directRoutes = ROUTE_BY_FILE.get(normalized);
    if (directRoutes) {
      addPaths(selection, directRoutes);
      continue;
    }

    if (NON_PUBLIC_PATTERNS.some((pattern) => pattern.test(normalized))) continue;
    if (BROAD_PUBLIC_PATTERNS.some((pattern) => pattern.test(normalized))) {
      return { mode: "full", paths: new Set() };
    }

    // Any unclassified source file can affect multiple rendered routes.
    if (normalized.startsWith("src/")) {
      return { mode: "full", paths: new Set() };
    }
  }

  if (!selection.paths.size) return { mode: "none", paths: new Set() };
  return selection;
}

export function urlsForSelection(sitemapUrls, selection) {
  if (selection.mode === "full") return [...new Set(sitemapUrls)];
  if (selection.mode === "none") return [];

  return [...new Set(sitemapUrls)].filter((url) => {
    const path = new URL(url).pathname.replace(/\/+$/, "") || "/";
    return selection.paths.has(path)
      || (selection.paths.has("@posts") && path.startsWith("/posts/"))
      || (selection.paths.has("@domains") && path.startsWith("/domains/"));
  });
}
