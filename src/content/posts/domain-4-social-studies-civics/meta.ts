import type { LifeEducationPostMeta } from "../../postTypes";
import cardImage from "./images/card-image.webp";
import heroImage from "./images/hero-image.webp";

export const metadata = {
  slug: "domain-4-social-studies-civics",
  title: "Who Makes the Rules?",
  excerpt: "Civic literacy for young adults means understanding power, history, government, institutions, and how to navigate rules when the system is unfamiliar.",
  publishedAt: "2026-05-12",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Social Studies", "Civics", "Systems Literacy"],
  heroImage,
  heroAlt: "Community members weigh different perspectives on renewable-energy development against a mountain landscape.",
  cardImage,
  cardAlt: "A young adult prepares identification and forms to navigate a state driver licensing office.",
} satisfies LifeEducationPostMeta;
