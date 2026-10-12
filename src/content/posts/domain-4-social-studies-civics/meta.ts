import type { LifeEducationPostMeta } from "../../postTypes";
import socialStudiesHero from "./images/young-adult-with-map.webp";

export const metadata = {
  slug: "domain-4-social-studies-civics",
  title: "Who Makes the Rules?",
  excerpt: "Civic literacy for young adults means understanding power, history, government, institutions, and how to navigate rules when the system is unfamiliar.",
  publishedAt: "2026-05-12",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Social Studies", "Civics", "Systems Literacy"],
  heroImage: socialStudiesHero,
  heroAlt:
    "A young adult holding a map at the center of a city, surrounded by sketched scenes of a capitol building, polling box, passport checkpoint, bus stop, news page, and signposts pointing in different directions.",
  cardImage: socialStudiesHero,
  cardAlt:
    "A young adult holding a map, surrounded by civic scenes -- capitol, polling box, passport checkpoint, bus stop, news page, and signposts.",
} satisfies LifeEducationPostMeta;
