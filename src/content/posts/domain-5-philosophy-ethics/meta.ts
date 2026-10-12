import type { LifeEducationPostMeta } from "../../postTypes";
import heroCrossroads from "./images/hero-crossroads.webp";

export const metadata = {
  slug: "domain-5-philosophy-ethics",
  title: "When the Right Answer Isn't Obvious",
  excerpt: "Ethical reasoning for teenagers means testing arguments, weighing competing values, thinking through moral dilemmas, and knowing when obedience is not enough.",
  publishedAt: "2026-05-23",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Philosophy", "Ethics", "Judgment"],
  heroImage: heroCrossroads,
  heroAlt:
    "A young person stands at a hard ethical crossroads between an easier crowded path and a harder green-lit path toward judgment and character.",
  cardImage: heroCrossroads,
  cardAlt: "A young person faces a split path between easier choices and a harder ethical road.",
} satisfies LifeEducationPostMeta;
