import type { RichSectionData } from "../types";

export const WHY_DATA: {
  title: string;
  subtitle: string;
  intro: string[];
  sections: RichSectionData[];
} = {
  title: "Why LifeEducation.org Exists",
  subtitle: "Main public overview",
  intro: [
    "Most education talk starts in the wrong place.",
    "It starts with school. Or curriculum. Or standards. Or credentials.",
    "The better starting point is simpler: what should an 18-year-old actually be able to do?",
  ],
  sections: [
    {
      heading: "The Standard",
      body: [
        "Not what classes they sat through. Not what boxes got checked. Not what looked good on paper. What can they actually do, on their own, in real life?",
        "That is the standard.",
      ],
    },
    {
      heading: "What LifeEducation Is",
      body: [
        "LifeEducation is a lightweight operating system for raising capable, self-directed humans.",
        "The environment can change. The operating system stays.",
        "The goal is real capability, autonomy, and judgment.",
      ],
    },
    {
      heading: "The Six Priorities",
      bullets: [
        "Agency — initiate, choose, steer.",
        "Capability — do real things in the real world.",
        "Optionality — keep doors open and avoid accidental dead ends.",
        "Integrity — honesty, responsibility, repair when wrong.",
        "Health — the capacity to carry a real life.",
        "Belonging — relationships, community, contribution.",
      ],
      footer:
        "Those six priorities are the point. They run through every domain, every review, and every decision.",
    },
    {
      heading: "What Floor-Complete Means",
      body: [
        "A floor-complete 18-year-old is not perfect. They are a young adult who can function.",
        "If you dropped them into a new city at 18, they would not panic. They would ask good questions, handle money, solve problems, and keep moving.",
        "The Floor is the contract. It defines the non-negotiable minimum capability expected by age 18.",
      ],
    },
    {
      heading: "What This Looks Like in Practice",
      bullets: [
        "Responsibility is real.",
        "Movement is real.",
        "Money is real.",
        "Conflict is real.",
        "Travel is real.",
        "Projects are real.",
        "Repair is real.",
        "Curiosity is real.",
        "Contribution is real.",
      ],
      footer:
        "The point is not to turn family life into school at home. The point is to build a life where real things happen on purpose.",
    },
  ],
};
