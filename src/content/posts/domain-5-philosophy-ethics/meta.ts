import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-5-philosophy-ethics",
  title: "When the Right Answer Isn't Obvious",
  excerpt: "Ethical reasoning for teenagers means testing arguments, weighing competing values, thinking through moral dilemmas, and knowing when obedience is not enough.",
  publishedAt: "2026-05-23",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Philosophy", "Ethics", "Judgment"],
  heroImage,
  heroAlt: "Four people consider competing views of renewable energy in a mountain community.",
  cardImage,
  cardAlt: "A teenager studies a four-step guide for comparing arguments, testing evidence, and reaching a reasoned view.",
} satisfies LifeEducationPostMeta;
