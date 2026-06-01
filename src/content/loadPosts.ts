import type { LifeEducationPost, LifeEducationPostMeta, PostImage } from "./postTypes";

type PostModule = {
  default: LifeEducationPost;
};

const metadataModules = import.meta.glob("./posts/*/meta.ts", {
  eager: true,
  import: "metadata",
}) as Record<string, LifeEducationPostMeta>;

const postModules = import.meta.glob("./posts/*/index.tsx") as Record<string, () => Promise<PostModule>>;

function getPostDirectorySlug(path: string): string {
  const match = path.match(/\.\/posts\/([^/]+)\/(?:index\.tsx|meta\.ts)$/);
  if (!match) {
    throw new Error(`Unexpected LifeEducation post path: ${path}`);
  }

  return match[1];
}

function getPostTimestamp(post: LifeEducationPostMeta): number {
  return new Date(`${post.publishedAt}T12:00:00`).getTime();
}

function sortNewestFirst(a: LifeEducationPostMeta, b: LifeEducationPostMeta): number {
  return getPostTimestamp(b) - getPostTimestamp(a);
}

function assertUniqueSlugs(items: LifeEducationPostMeta[]): void {
  const seen = new Set<string>();

  for (const post of items) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate LifeEducation post slug: ${post.slug}`);
    }

    seen.add(post.slug);
  }
}

const loadedPosts = Object.entries(metadataModules).map(([path, metadata]) => {
  const directorySlug = getPostDirectorySlug(path);
  if (metadata.slug !== directorySlug) {
    throw new Error(`Post slug "${metadata.slug}" must match folder "${directorySlug}".`);
  }

  return metadata;
});

assertUniqueSlugs(loadedPosts);

const postLoaders = new Map(
  Object.entries(postModules).map(([path, loadModule]) => [getPostDirectorySlug(path), loadModule]),
);

export const allPosts: LifeEducationPostMeta[] = [...loadedPosts].sort(sortNewestFirst);
export const posts: LifeEducationPostMeta[] = allPosts.filter((post) => post.status !== "Draft");

export function getFeaturedPost(): LifeEducationPostMeta | undefined {
  return posts.find((post) => post.status === "Featured") ?? posts[0];
}

export function getPostBySlug(slug: string): LifeEducationPostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function loadPostBySlug(slug: string): Promise<LifeEducationPost | undefined> {
  const metadata = getPostBySlug(slug);
  const loadModule = postLoaders.get(slug);

  if (!metadata || !loadModule) {
    return undefined;
  }

  const module = await loadModule();
  return module.default;
}

export function getPostsByTopic(topic: string): LifeEducationPostMeta[] {
  return posts.filter((post) => post.topic === topic);
}

export function getRecentPosts(limit?: number): LifeEducationPostMeta[] {
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export function getPostHref(post: LifeEducationPostMeta | string): string {
  const slug = typeof post === "string" ? post : post.slug;
  return `/posts/${slug}`;
}

// Returns the long-form essay for a domain, if one exists yet.
// Posts follow the slug convention `domain-{number}-{topic}`, so we match on the
// numeric prefix. Domains without an essay (currently 7-10) simply return undefined,
// and the domain page degrades cleanly.
export function getPostForDomain(domainNumber: string): LifeEducationPostMeta | undefined {
  const prefix = `domain-${domainNumber}-`;
  return posts.find((post) => post.slug.startsWith(prefix));
}

export function getPostImage(post: LifeEducationPostMeta, preferred: "card" | "hero" = "card"): PostImage | undefined {
  const src = preferred === "card" ? post.cardImage ?? post.heroImage : post.heroImage ?? post.cardImage;
  const alt = preferred === "card" ? post.cardAlt ?? post.heroAlt : post.heroAlt ?? post.cardAlt;

  if (!src) {
    return undefined;
  }

  return {
    src,
    alt: alt ?? "",
  };
}

export function formatPostDate(post: LifeEducationPostMeta): string {
  if (post.displayDate) return post.displayDate;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${post.publishedAt}T12:00:00`));
}
