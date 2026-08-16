import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "golden-olden-days-denominator-trick",
  title: "The Golden Olden Days Were a Denominator Trick",
  excerpt:
    "People love saying students used to be smarter and better educated. Before we compare today’s students to the past, we have to ask who was counted, who was excluded, and what the numbers prove.",
  publishedAt: "2026-08-16",
  status: "Recent",
  topic: "Schooling and Capability",
  tags: ["LifeEducation", "Schooling", "Capability", "Literacy", "Numeracy", "Education Data"],
  heroImage,
  heroAlt:
    "A charcoal editorial image of old school records and modern data dashboards feeding into the same question about student capability.",
  cardImage,
  cardAlt:
    "A young person stands between old school records and modern dashboards, both claiming to measure education.",
} satisfies LifeEducationPostMeta;
