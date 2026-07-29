import type { LifeEducationPostMeta } from "../../postTypes";
import heroImage from "./images/hero-image.webp";
import cardImage from "./images/card-image.webp";

export const metadata = {
  slug: "what-scales-is-the-fantasy",
  title: "What Scales Is the Fantasy",
  excerpt:
    "The number can be real. The story the system bolts onto it is the lie -- and that's why it never scales.",
  publishedAt: "2026-06-25",
  modifiedAt: "2026-07-29",
  displayDate: "June 25, 2026",
  status: "Recent",
  topic: "Founding Notes",
  tags: ["LifeEducation", "Education", "School Systems", "Measurement", "Accountability"],
  heroImage,
  heroAlt:
    "A success-branded school lifted on supports, emphasizing how visible achievement can depend on hidden conditions.",
  cardImage,
  cardAlt:
    "A school facade dressed up as success while hidden machinery and a selective gate sit beneath the surface.",
} satisfies LifeEducationPostMeta;
