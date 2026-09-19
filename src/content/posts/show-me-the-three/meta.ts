import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "show-me-the-three",
  title: "Show Me the Three",
  excerpt:
    "AI can make a student's work look better without making the student better. The real question is what the learner owns: where they started, how far they moved, and whether they can explain and defend the work.",
  publishedAt: "2026-09-19",
  status: "Recent",
  topic: "Founding Notes",
  tags: ["LifeEducation", "Education", "AI", "Assessment", "Growth", "The Floor"],
  heroImage,
  heroAlt:
    "A teacher checks a student's work during class while a green 1-to-3 growth path contrasts with an AI-polished 10.",
  cardImage,
  cardAlt:
    "A teacher works beside a student as a green 1-to-3 growth path is contrasted with a polished 10 in the background.",
} satisfies LifeEducationPostMeta;
