import type { LifeEducationPostMeta } from "../../postTypes";
import communicationModesHero from "./images/communication-modes-hero.jpg";
import communicationModesSocial from "./images/communication-modes-social.jpg";

export const metadata = {
  slug: "domain-1-communication",
  title: "Can You Explain What Happened?",
  excerpt: "Communication skills for teens go beyond essays. Learn why giving context, answering the actual question, listening, and asking for help are essential to adulthood.",
  publishedAt: "2026-04-29",
  modifiedAt: "2026-10-12",
  status: "Recent",
  topic: "Domains",
  tags: ["LifeEducation", "Domains", "Communication", "The Floor", "Adult Capability"],
  heroImage: communicationModesHero,
  heroAlt:
    "A grayscale illustration with purple accents showing different ways people communicate, including email, writing, conversation, a customer service call, and asking a question.",
  cardImage: communicationModesSocial,
  cardAlt:
    "A grayscale and purple illustration showing multiple everyday forms of communication around a young person.",
} satisfies LifeEducationPostMeta;
