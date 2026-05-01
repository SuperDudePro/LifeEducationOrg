import type { LifeEducationPost, PostImage } from "./postTypes";

type PostModule = {
  default: LifeEducationPost;
};

const modules = import.meta.glob("./posts/*/index.tsx", { eager: true }) as Record<string, PostModule>;

function getPostTimestamp(post: LifeEducationPost): number {
  return new Date(`${post.publishedAt}T12:00:00`).getTime();
}

function sortNewestFirst(a: LifeEducationPost, b: LifeEducationPost): number {
  return getPostTimestamp(b) - getPostTimestamp(a);
}

function assertUniqueSlugs(items: LifeEducationPost[]): void {
  const seen = new Set<string>();

  for (const post of items) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate LifeEducation post slug: ${post.slug}`);
    }

    seen.add(post.slug);
  }
}

const loadedPosts = Object.values(modules).map((module) => module.default);
assertUniqueSlugs(loadedPosts);

export const allPosts: LifeEducationPost[] = [...loadedPosts].sort(sortNewestFirst);
export const posts: LifeEducationPost[] = allPosts.filter((post) => post.status !== "Draft");

export function getFeaturedPost(): LifeEducationPost | undefined {
  return posts.find((post) => post.status === "Featured") ?? posts[0];
}

export function getPostBySlug(slug: string): LifeEducationPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTopic(topic: string): LifeEducationPost[] {
  return posts.filter((post) => post.topic === topic);
}

export function getRecentPosts(limit?: number): LifeEducationPost[] {
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export function getPostHref(post: LifeEducationPost | string): string {
  const slug = typeof post === "string" ? post : post.slug;
  return `/posts/${slug}`;
}

export function getPostImage(post: LifeEducationPost, preferred: "card" | "hero" = "card"): PostImage | undefined {
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

export function formatPostDate(post: LifeEducationPost): string {
  if (post.displayDate) return post.displayDate;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${post.publishedAt}T12:00:00`));
}
