import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "golden-olden-days-denominator-trick",
  title: "The Golden Olden Days Were a Denominator Trick",
  excerpt:
    "Were students really smarter in the past? Before comparing generations, ask who stayed in school, who was excluded, and whose results were counted.",
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
