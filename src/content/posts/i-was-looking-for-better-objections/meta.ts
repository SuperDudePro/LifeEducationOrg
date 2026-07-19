import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "i-was-looking-for-better-objections",
  title: "I Was Looking for Better Objections",
  excerpt:
    "I expected teachers to challenge LifeEducation as educators. Too often, they challenged it as employees of schools.",
  publishedAt: "2026-07-19",
  displayDate: "July 19, 2026",
  status: "Recent",
  topic: "Founding Notes",
  tags: ["LifeEducation", "Education", "School Systems", "Capability", "Parents"],
  heroImage,
  heroAlt:
    "A tired teacher in a staff meeting looks past paperwork and laptops toward a brighter outdoor scene where people of different ages are learning and helping one another.",
  cardImage,
  cardAlt:
    "A tabletop covered with scattered speech cards around a single upright card bearing a large question mark and a small green underline.",
} satisfies LifeEducationPostMeta;
