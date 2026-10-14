import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-8-creative-expression",
  title: "Make Something. Finish It.",
  excerpt: "Creative confidence grows through practice, revision, criticism, and finishing. Creativity is a real-world skill, not a label assigned to talented children.",
  publishedAt: "2026-05-29",
  modifiedAt: "2026-10-12",
  displayDate: "May 29, 2026",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Creative Expression", "Creativity", "Capability"],
  heroImage,
  heroAlt:
    "A young person develops creative ideas at a worktable covered with sketches, models, and draft pages.",
  cardImage,
  cardAlt:
    "A young creator reflects beside sketches, notebooks, and a small sculpture in a quiet studio.",
} satisfies LifeEducationPostMeta;
