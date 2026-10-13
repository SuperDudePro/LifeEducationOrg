import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-2-practical-numeracy",
  title: "Don't Trust the Number Yet",
  excerpt: "Practical math skills for real life include estimation, algebra, geometry, interpreting statistics, and asking better questions about prices, risk, and misleading numbers.",
  publishedAt: "2026-05-03",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Practical Numeracy", "The Floor", "Adult Capability"],
  heroImage,
  heroAlt: "A teenager examines a receipt, price comparisons, and a graph before accepting the numbers in front of them.",
  cardImage,
  cardAlt: "A young person compares grocery receipts with handwritten calculations before trusting a total.",
} satisfies LifeEducationPostMeta;
