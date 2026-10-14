import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-3-scientific-thinking",
  title: "What Would Change Your Mind?",
  excerpt: "Scientific thinking in everyday life means separating observation from assumption, checking evidence, testing explanations, and being willing to revise a belief.",
  publishedAt: "2026-05-08",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Scientific Thinking", "The Floor", "Adult Capability"],
  heroImage,
  heroAlt: "A teenager examines field notes and competing explanations about a lizard's behavior.",
  cardImage,
  cardAlt: "A young observer studies the details of a plant leaf using a magnifying glass and field notebook.",
} satisfies LifeEducationPostMeta;
