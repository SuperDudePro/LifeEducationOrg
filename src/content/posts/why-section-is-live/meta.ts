import type { LifeEducationPostMeta } from "../../postTypes";
import whyHero from "./images/why-section-hero.jpg";
import whySocial from "./images/why-section-social.jpg";

export const metadata = {
  slug: "why-section-is-live",
  title: "The Why Section Is Live",
  excerpt:
    "The Why section is LifeEducation's front door: why capable adulthood matters more than school performance, and how the Floor and Domains fit together.",
  publishedAt: "2026-04-29",
  displayDate: "April 2026",
  status: "Recent",
  topic: "LifeEducation Updates",
  tags: ["LifeEducation", "The Why", "The Floor", "Capability", "Parenting"],
  heroImage: whyHero,
  heroAlt:
    "A young person stands at a marked threshold facing a road toward a city, transit hub, and open landscape, symbolizing the start of adult capability.",
  cardImage: whySocial,
  cardAlt:
    "A young person stands at the edge of a path facing a city, transit hub, and open road.",
} satisfies LifeEducationPostMeta;
