import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "i-was-looking-for-better-objections",
  title: "I Was Looking for Better Objections",
  excerpt:
    "I asked teachers to challenge LifeEducation. Their objections did not force a redesign, but they showed me what the public explanation still needed to answer.",
  publishedAt: "2026-07-19",
  modifiedAt: "2026-07-28",
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
