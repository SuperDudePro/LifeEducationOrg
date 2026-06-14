import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "run",
  title: "RUN",
  excerpt:
    "Life Education is a refusal to hand children an inferior product when the world itself is available as the alternative.",
  publishedAt: "2026-06-14",
  displayDate: "June 14, 2026",
  status: "Recent",
  topic: "Founding Notes",
  tags: ["LifeEducation", "Education", "Worldschooling", "The Floor"],
  heroImage,
  heroAlt:
    "A young person with a backpack running away from an institutional school building toward a bright open road, coastline, and mountains.",
  cardImage,
  cardAlt:
    "A child with a backpack standing in an open school doorway and looking toward a bright path through hills and sky.",
} satisfies LifeEducationPostMeta;
