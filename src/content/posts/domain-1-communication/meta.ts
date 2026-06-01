import type { LifeEducationPostMeta } from "../../postTypes";
import communicationModesHero from "./images/communication-modes-hero.jpg";
import communicationModesSocial from "./images/communication-modes-social.jpg";

export const metadata = {
  slug: "domain-1-communication",
  title: "Domain 1: Communication Is More Than Writing Essays",
  excerpt:
    "Communication is not just essays, grammar, or speeches. It is how a young adult asks for help, explains context, answers the actual question, repairs damage, and moves through the world with other people.",
  publishedAt: "2026-04-29",
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
