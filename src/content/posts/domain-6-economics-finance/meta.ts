import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "domain-6-economics-finance",
  title: "What Are You Really Agreeing To?",
  excerpt: "Financial literacy for teens is more than vocabulary: it means reading contracts, comparing debt, recognizing incentives, and making money decisions that preserve options.",
  publishedAt: "2026-05-24",
  modifiedAt: "2026-10-12",
  displayDate: "May 24, 2026",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Economics", "Finance", "Money"],
  heroImage,
  heroAlt:
    "A young adult works through a simple budget, lease, and balance screen in a mostly black-and-white sketch with restrained green highlights.",
  cardImage,
  cardAlt:
    "A young adult reviews a rental agreement beside an apartment listing, highlighting important lease clauses and questions.",
} satisfies LifeEducationPostMeta;
