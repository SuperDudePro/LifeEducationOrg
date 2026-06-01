import type { LifeEducationPostMeta } from "../../postTypes";
import heroCrossroads from "./images/hero-crossroads.webp";

export const metadata = {
  slug: "domain-5-philosophy-ethics",
  title: "Domain 5: Philosophy & Ethics Is More Than Having Opinions",
  excerpt:
    "Philosophy & Ethics is not about old books, character posters, or having the right opinions. It is how a young adult learns to think when values collide, feelings flare, rules run out, and no adult is standing there to make the call.",
  publishedAt: "2026-05-23",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Philosophy", "Ethics", "Judgment"],
  heroImage: heroCrossroads,
  heroAlt:
    "A young person stands at a hard ethical crossroads between an easier crowded path and a harder green-lit path toward judgment and character.",
  cardImage: heroCrossroads,
  cardAlt: "A young person faces a split path between easier choices and a harder ethical road.",
} satisfies LifeEducationPostMeta;
