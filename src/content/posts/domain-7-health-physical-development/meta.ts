import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-7-health-physical-development",
  title: "Taking Care of the Body You Live In",
  excerpt: "Health literacy for teens includes food, movement, sleep, stress, medical communication, first aid, and managing your own health responsibly.",
  publishedAt: "2026-05-29",
  modifiedAt: "2026-10-12",
  displayDate: "May 29, 2026",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Health", "Fitness", "Body"],
  heroImage,
  heroAlt:
    "A capable young adult walking forward, with illustrations of hydration, food, first aid, and mindful breathing.",
  cardImage,
  cardAlt:
    "A young adult reviews a realistic plan for sleep, meals, hydration, and movement at a kitchen table.",
} satisfies LifeEducationPostMeta;
