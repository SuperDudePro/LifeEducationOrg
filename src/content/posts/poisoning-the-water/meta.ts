import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "poisoning-the-water",
  title: "Poisoning the Water",
  excerpt:
    "I’m building LifeEducation in public—and documenting why I can no longer trust the school system with my youngest children before familiarity makes the default feel normal again.",
  publishedAt: "2026-07-21",
  displayDate: "July 21, 2026",
  status: "Draft",
  topic: "Founding Notes",
  tags: ["LifeEducation", "School Critique", "Building in Public"],
  heroImage,
  heroAlt:
    "A parent and child face a school shown in cutaway, revealing gears, paperwork, clocks, and hidden machinery.",
  cardImage,
  cardAlt:
    "A parent writes while pages form a barrier between two children and green water flowing from a school.",
} satisfies LifeEducationPostMeta;
