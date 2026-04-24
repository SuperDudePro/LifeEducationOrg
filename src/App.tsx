import { useEffect, useMemo, useState, type ReactNode } from "react";
import "./App.css";

type Domain = {
  slug: string;
  title: string;
  number: string;
  coreOutcomes: string[];
  competencies: string[];
  evidence: string;
};

const TREE_FAVICON = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="LifeEducation">
  <rect width="64" height="64" rx="14" fill="#08130f"/>
  <path d="M32 9c-7.7 9.2-13.5 18-17.4 26.3C11.1 42.8 16.3 51 24.4 51H30v6h4v-6h5.6c8.1 0 13.3-8.2 9.8-15.7C45.5 27 39.7 18.2 32 9Z" fill="#177B58"/>
  <path d="M32 17v34M23 36l9 8 9-8M25 27l7 7 7-7" fill="none" stroke="#d9f5e8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`)}`;

const WHY_DATA = {
  title: "Why LifeEducation.org Exists",
  subtitle: "Main public overview",
  intro: [
    "Most education talk starts in the wrong place.",
    "It starts with school. Or curriculum. Or standards. Or credentials.",
    "I think the better starting point is simpler:",
    "What should an 18-year-old actually be able to do?",
  ],
  sections: [
    {
      heading: "The Standard",
      body: [
        "Not what classes they sat through. Not what boxes got checked. Not what looked impressive on paper. What can they actually do, on their own, in real life?",
        "That is the standard.",
        "Traditional school can help with pieces of that standard. But too often it does not reliably produce it. Too often it produces compliance without ownership, grades without capability, credentials without judgment, and a habit of waiting to be told what matters. That is not enough.",
      ],
    },
    {
      heading: "What LifeEducation Is",
      body: [
        "This project is not about tweaking school around the edges. It is about naming a better target and building around that target directly.",
        "LifeEducation is a lightweight operating system for raising capable, self-directed humans. It can sit on top of school, homeschooling, worldschooling, hybrid, or some mix. The environment can change. The operating system stays.",
        "The goal is not credentials. The goal is real capability, autonomy, and judgment, built over time, proven in real life, and adjusted as life changes.",
        "When I say operating system, I do not mean a giant curriculum. I mean a stable set of priorities, competence targets, guardrails, and review rhythms that keep the whole thing coherent. It should stay useful when life gets messy. It should stay light enough that it supports family life instead of swallowing it.",
      ],
    },
    {
      heading: "What We Are Optimizing For",
      body: [
        "Underneath the whole project are six priorities:",
      ],
      bullets: [
        "Agency — initiate, choose, steer.",
        "Capability — do real things in the real world.",
        "Optionality — keep doors open and avoid accidental dead ends.",
        "Integrity — honesty, responsibility, repair when wrong.",
        "Health — the capacity to carry a real life.",
        "Belonging — relationships, community, contribution.",
      ],
      footer:
        "Those six priorities are the point. They run through every domain, every review, and every decision. They are what the system is optimizing for.",
    },
    {
      heading: "What Floor-Complete Means",
      body: [
        "A floor-complete 18-year-old is not perfect.",
        "They are a young adult who can function.",
        "If you dropped them into a new city at 18, they would not panic. They would find housing options, handle money, ask good questions, learn fast, solve problems, and keep moving. They would know how to navigate real systems. They would know how to think when the answer is not obvious. They would know how to act without waiting for permission. They would know how to recover when things go wrong.",
        "That is the floor.",
        "The Floor is the contract. It defines the non-negotiable minimum capability expected by age 18. It is not a curriculum. It does not dictate how learning happens. It defines what capability must exist by the end.",
      ],
    },
    {
      heading: "What This Looks Like In Practice",
      body: [
        "This does not mean turning the house into school.",
        "It means building a life where real things happen on purpose.",
      ],
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
        "The parent’s job is not to lecture all day. The parent’s job is closer to environment design: choosing good contexts, noticing opportunities, arranging exposure, sequencing challenge, and closing loops when life presents something worth learning from. The system helps keep that from collapsing into randomness without turning it into assignment theater. Evidence and outputs exist to make capability legible and steer decisions, not to create paperwork. The system stays light on purpose.",
    },
    {
      heading: "The Three Layers",
      body: [
        "LifeEducation makes the most sense when you see it as three layers, not one.",
        "1. Floor Completion",
        "This is the minimum adulthood contract. By 18, the young adult can function effectively in the real world without being managed like a child in an adult body. They can run their own life day to day, learn what they need next, navigate new places and systems, think clearly, handle stress, build relationships, and function in ambiguity.",
        "2. Domain Cultivation",
        "This is the broader lived environment. The domains are not school subjects in disguise. They are a coverage map. They exist because real life is broad, and families are good at overdeveloping what they already value while neglecting what feels less natural. The domains make blind spots visible. They keep the full range of adult competence in view: communication, quantitative reasoning, science and systems, money, health, ethics, creativity, technology, and real-world execution.",
        "3. Depth and Specialization",
        "Above the Floor, depth, specialization, and direction become increasingly self-directed. This is where the young person chooses what to push hard: writing, mechanics, entrepreneurship, science, athletics, art, travel, languages, or something else entirely. The point is not to force equal depth everywhere. The point is to build a broad enough human first, then let depth become real.",
        "This three-layer model matters because a capable kid may reach much of the Floor relatively early. That does not make the system unnecessary. It means the contract is doing its job. The harder challenge is not minimum survival capability. The harder challenge is building a life rich enough that the domains become the air the kid breathes rather than a school-style checklist.",
      ],
    },
    {
      heading: "What If They Only Meet The Floor?",
      body: [
        "A fair challenge is: what if a kid simply aims to meet the Floor and then stops there?",
        "My answer is that even this “worst-case” outcome is still a meaningful success compared with systems that hand out credentials without dependable real-world capability. The Floor is deliberately a minimum, not an aspiration. It is the baseline contract for adulthood. It asks for demonstrated capability, not seat time, credits, or paper compliance.",
        "And in actual life, the point is not to stop there. The broader environment, the domains, and later self-directed depth are what keep the system from collapsing into mere box-checking. Even in the fallback case, the young person would still be living inside family life, responsibilities, travel, training, projects, relationships, and real-world systems.",
        "The Floor is not the ceiling. It is the line below which we do not pretend adulthood exists.",
      ],
    },
    {
      heading: "What This Is Not",
      bullets: [
        "This is not school at home.",
        "It is not a credential chase.",
        "It is not a surveillance machine.",
        "It is not a rigid curriculum.",
        "It is not a paperwork hobby for anxious parents.",
      ],
      footer:
        "LifeEducation is for families who want to raise capable adults without surrendering the target to grades, pacing guides, or institutional defaults.",
    },
    {
      heading: "Why Document It At All",
      body: [
        "Documentation is a tool for clarity, coherence, and legibility.",
        "Inside the family, it makes the target explicit: what is required, what is optional, what we are optimizing for, and whether daily life is actually pointing at the adult we say we want to produce.",
        "Outside the family, it makes real capability visible without turning life into theater. It gives the project enough structure that other people can understand it, evaluate it, and, when necessary, see that the work is real.",
        "That is why the project distinguishes between the thesis, the contract, the map, and the operating mechanics. The Why defines the point. The Floor defines the minimum. The Domains keep the full picture in view. The lower layers explain how the system runs without being allowed to redefine the target.",
      ],
    },
    {
      heading: "Why This Matters For My Family",
      body: [
        "I am building this for my family first.",
        "My two younger kids will likely grow up across multiple environments and systems. Travel may become one of those environments, but travel is not the point. It is just one possible lab.",
        "The real goal is broader: raise humans who can function well anywhere. That is why I care more about the operating system than the app.",
      ],
    },
    {
      heading: "Bottom Line",
      body: [
        "I am not trying to raise kids who are merely school-successful.",
        "I am trying to raise kids who can own their lives.",
        "LifeEducation exists to define the minimum standard clearly, keep the full map of human competence in view, cultivate that competence broadly enough that it becomes normal life rather than staged schooling, and then transfer ownership from parent to child over time.",
        "Not perfection.",
        "Not polish.",
        "Not compliance.",
      ],
      footer:
        "By 18, they will not be managed like children in adult-sized bodies. They will be floor-complete humans with the tools to build the rest themselves.",
    },
  ],
};

const BY18_DATA = {
  title: "By 18: What You Can Do",
  subtitle: "Public translation of the Floor contract",
  intro: [
    "By 18 names the deadline, not the earliest possible finish. A young person may meet this standard earlier; if they do, the focus shifts toward maintenance, broader domain cultivation, and increasingly self-directed depth.",
    "This is the point of the system. Not what classes you sat through. Not what boxes got checked. Not what looked good on paper. By 18, you can actually do real things in real life.",
    "The Floor is the non-negotiable minimum. It is not the ceiling. Above it, you choose what to go deep on.",
  ],
  lead: "By 18, you can:",
  groups: [
    {
      title: "Run Your Own Life",
      items: [
        "manage your time, obligations, logistics, and basic adult tasks without being managed by someone else. (D10)",
        "show up in a new city, country, institution, or online space and figure out how it works without panicking. (D4, D10)",
        "navigate institutions and bureaucracies — banks, hospitals, government offices, schools — even when the system is not designed to help you. (D4, D10)",
        "advocate for yourself in medical, legal, educational, or workplace settings. (D10)",
        "learn what you need next without waiting for a formal class: find resources, ask for help, practice, and keep going when it gets hard. (D10)",
        "fix basic everyday problems before calling an expert — attempt repairs, troubleshoot, and know when something exceeds your limits. (D10)",
        "recover when things go wrong instead of collapsing at the first obstacle. (D5, D7, D10)",
      ],
    },
    {
      title: "Communicate Clearly and Deal Well With People",
      items: [
        "read adult-level material across different genres and understand what it actually says. (D1)",
        "write clearly enough to be understood by the audience you are writing for. (D1)",
        "speak comfortably with strangers, authority figures, and groups when you need to. (D1)",
        "listen well enough to represent someone else’s view fairly, even when you disagree. (D1, D5)",
        "notice when language is being used to manipulate, pressure, or persuade you. (D1, D5, D9)",
        "function in at least one language beyond English at a conversational level. (D1)",
        "engage respectfully with people from different cultures, religions, and worldviews without needing to convert, fix, or dismiss them. (D4, D5)",
        "handle conflict without instantly escalating, collapsing, or disappearing. (D5, D10)",
        "build relationships that include both independence and contribution. (D5, D10)",
      ],
    },
    {
      title: "Think Clearly About the World",
      items: [
        "ask ‘how do we know that?’ and mean it. (D3)",
        "test a claim, observe what happens, and adjust when reality disagrees with you. (D3)",
        "distinguish correlation from causation, anecdote from evidence, and one study from broader consensus. (D3)",
        "interpret numbers, charts, percentages, ratios, and basic statistics without being easily fooled. (D2, D3)",
        "do everyday mental math, estimate, and sanity-check numbers before blindly trusting them. (D2)",
        "handle Algebra I and Geometry fundamentals — follow formulas, rearrange equations, and reason about shapes and spatial relationships. (D2)",
        "reason about risk, tradeoffs, and consequences in real decisions. (D2, D5, D6)",
        "change your mind when better evidence shows up without treating that as weakness. (D3, D5)",
      ],
    },
    {
      title: "Understand Power, Systems, and Society",
      items: [
        "explain how power works: who has it, how they got it, how they keep it, and how it changes. (D4)",
        "understand civic structures — voting, laws, courts, and rights — well enough to pass a rigorous civics exam. (D4)",
        "recognize historical patterns and use them to make better sense of current events. (D4)",
        "understand your own historical and cultural context, including your U.S., Philippines, and Ireland connections. (D4)",
        "read news critically: notice bias, missing context, conflicting accounts, and manipulative framing. (D1, D4, D9)",
        "understand that systems are human-made, have tradeoffs, and can be changed. (D4, D6)",
      ],
    },
    {
      title: "Handle Money and Value Without Getting Steamrolled",
      items: [
        "budget, track spending, save, and avoid obvious debt traps. (D6)",
        "read paychecks, bank statements, contracts, and leases and know what you are agreeing to. (D1, D6)",
        "understand taxes well enough to file a simple return and not get blindsided. (D2, D6)",
        "make informed decisions about purchases, loans, and basic investing. (D2, D6)",
        "understand insurance well enough not to get steamrolled by providers or paperwork. (D6)",
        "think in opportunity cost: money, time, tradeoffs, and what you are giving up when you choose. (D2, D6)",
        "move and use money across borders without getting obviously fleeced. (D6, D10)",
      ],
    },
    {
      title: "Own Your Body and Health",
      items: [
        "take responsibility for sleep, hygiene, movement, and nutrition without needing to be nagged. (D7)",
        "cook real meals and feed yourself reasonably well in normal life. (D7, D10)",
        "maintain physical fitness in roughly the top-10% of your age group through real habits, not occasional effort. (D7)",
        "recognize when something is wrong with your body and decide when to rest, treat it, or get help. (D7)",
        "handle basic first aid and emergency response without freezing. (D7, D10)",
        "understand substances, sex, reproduction, and consent well enough to make informed decisions. (D7)",
        "manage stress with non-destructive coping tools that actually work for you. (D7, D5)",
        "notice your own mental health patterns and ask for support when needed. (D7)",
      ],
    },
    {
      title: "Use Technology Without Being Ruled By It",
      items: [
        "use technology as a tool to get things done without being helpless or dependent. (D9)",
        "learn new tools, software, devices, and platforms without needing to be walked through every step. (D9)",
        "collaborate with AI usefully without outsourcing your thinking to it. (D9, D2)",
        "protect yourself online: passwords, privacy, scams, phishing, and digital common sense. (D9)",
        "evaluate online information by tracing sources, cross-checking claims, and noticing platform incentives. (D1, D4, D9)",
        "control your attention well enough that feeds, autoplay, and notifications do not run your life. (D7, D9)",
        "troubleshoot basic hardware and software problems before asking for help. (D9)",
        "use digital tools to create meaningful work — documents, presentations, videos, spreadsheets, designs, or other functional outputs. (D9)",
        "function when tech is unavailable, broken, or the wrong tool for the situation. (D9, D10)",
      ],
    },
    {
      title: "Make, Create, and Ship Real Things",
      items: [
        "make something that did not exist before. (D8)",
        "use creative work to process, communicate, explore, or express something real. (D1, D8)",
        "tolerate the discomfort of making imperfect things and keep going anyway. (D8, D5)",
        "appreciate creative work across forms and cultures, even when it is not your personal taste. (D8)",
        "distinguish personal preference from actual craft or quality. (D8, D5)",
        "maintain at least one creative outlet that feels satisfying and alive to you. (D8)",
        "turn an idea into a finished artifact, project, performance, or useful result. (D8, D10)",
      ],
    },
    {
      title: "Hold a Real Value System",
      items: [
        "explain what you believe and why, and revise it when needed. (D5)",
        "recognize ethical dilemmas and think through them instead of reacting blindly. (D5)",
        "spot logical fallacies and manipulative reasoning, including your own. (D5)",
        "distinguish ‘I don’t like this’ from ‘this is wrong.’ (D5, D8)",
        "tolerate ambiguity and still make decisions when certainty is unavailable. (D5, D10)",
        "understand that smart, decent people can disagree in good faith. (D5, D4)",
        "reflect on who you are becoming and whether that matches the life you want. (D5)",
        "And you do some things because you want to, not just because someone is making you. (D8, D10)",
      ],
    },
  ],
  closing: [
    "That is the Floor. Not perfection. Not polish. Not a script for your whole life. Just the baseline for entering adulthood as someone who can function, think, adapt, and build from there.",
  ],
};

const FLOOR_DATA = {
  title: "The 18-Year-Old Floor",
  subtitle: "Working Draft",
  notice:
    "Working Draft. This is the current authority on the minimum contract, but it is still intentionally open for revision.",
  intro: [
    "The Floor defines the non-negotiable minimum capability expected by age 18.",
    "It is the baseline for a young adult who can function effectively in the real world without being managed like a child in an adult body.",
  ],
  sections: [
    {
      heading: "What the Floor Is",
      body: [
        "The Floor is not a curriculum.",
        "It does not dictate how learning happens.",
        "It defines the capability that must exist before the Floor is honestly met.",
        "Above the Floor, depth, specialization, and direction become increasingly self-directed.",
      ],
    },
    {
      heading: "The Floor Lives Inside the Domains",
      body: [
        "The Floor is expressed through the LifeEducation domains.",
        "Domains exist to ensure that important parts of life are not neglected. The Floor defines the minimum contract inside those domains.",
      ],
    },
    {
      heading: "The Floor-Complete Human",
      bullets: [
        "runs their own life day to day",
        "can learn anything they need next",
        "navigates new places and systems",
        "has a reality-based picture of the major systems shaping life",
        "holds a value system they actually think about and update",
        "handles themselves under stress",
        "is decent to be around",
        "operates in ambiguity without freezing",
        "engages respectfully with people from different cultures, religions, and worldviews",
        "understands that independence and interdependence go together",
      ],
      footer:
        "They are capable of being dropped into a new city and figuring things out.",
    },
    {
      heading: "Floor Principles",
      bullets: [
        "The Floor is a contract.",
        "Capability matters more than credentials.",
        "Evidence exists to make capability legible.",
        "Verification should match the capability.",
      ],
    },
  ],
};

const DOMAINS: Domain[] = [
  {
    slug: "literacy-communication",
    title: "Literacy & Communication",
    number: "1",
    coreOutcomes: [
      "Read and interpret fiction and non-fiction at an adult level",
      "Write clearly, persuasively, and reflectively",
      "Speak effectively to diverse audiences",
    ],
    competencies: [
      "Reading comprehension",
      "Structured writing",
      "Practical writing",
      "Verbal communication",
      "Media literacy",
      "Multilingual proficiency",
    ],
    evidence: "Reading logs, published pieces, speech videos, multilingual conversations.",
  },
  {
    slug: "mathematics-logic",
    title: "Mathematics & Logic",
    number: "2",
    coreOutcomes: [
      "Master Algebra I and Geometry",
      "Apply quantitative reasoning in real-world problems",
      "Use logic and pattern recognition to solve novel tasks",
    ],
    competencies: [
      "Algebraic fluency",
      "Spatial reasoning",
      "Data analysis",
      "Mental math",
      "Risk and trade-off reasoning",
      "Structured problem-solving",
    ],
    evidence: "Solved problems, budgets, spreadsheets, code snippets, design docs.",
  },
  {
    slug: "scientific-thinking-observation",
    title: "Scientific Thinking & Observation",
    number: "3",
    coreOutcomes: [
      "Think like a scientist",
      "Demonstrate everyday scientific literacy",
      "Understand key biological, physical, and environmental systems",
    ],
    competencies: [
      "Experimental design",
      "Hypothesis testing",
      "Observation and inference",
      "Source validation",
      "Environmental literacy",
    ],
    evidence: "Lab write-ups, garden logs, field sketches, citizen-science uploads.",
  },
  {
    slug: "social-studies-civics",
    title: "Social Studies & Civics",
    number: "4",
    coreOutcomes: [
      "Grasp major historical narratives and civic structures",
      "Engage with diverse cultures and worldviews",
      "Apply historical thinking to current events",
    ],
    competencies: [
      "Civics",
      "History",
      "Geography",
      "Media interpretation",
      "Power and institutions",
    ],
    evidence: "Travel journals, debate clips, service reflections, mapping projects.",
  },
  {
    slug: "philosophy-ethics",
    title: "Philosophy & Ethics",
    number: "5",
    coreOutcomes: [
      "Think critically about values, purpose, and belief",
      "Evaluate arguments, including your own",
      "Navigate ambiguity and conflicting perspectives",
    ],
    competencies: [
      "Moral reasoning",
      "Bias analysis",
      "Debate and fair representation",
      "Logical fallacies",
      "Self-reflection",
    ],
    evidence: "Values maps, debates, reflective essays, ethics case briefs.",
  },
  {
    slug: "economics-finance",
    title: "Economics & Finance",
    number: "6",
    coreOutcomes: [
      "Make thoughtful, independent decisions about money and value",
      "Understand economic systems and trade-offs",
    ],
    competencies: [
      "Budgeting",
      "Contracts and leases",
      "Taxes",
      "Insurance",
      "Opportunity cost",
      "Travel budgeting",
    ],
    evidence: "Budgets, investment journal, business model canvas, trip cost sheets.",
  },
  {
    slug: "health-physical-development",
    title: "Health & Physical Development",
    number: "7",
    coreOutcomes: [
      "Maintain lifelong physical and mental wellness",
      "Understand the body-mind-habit loop",
    ],
    competencies: [
      "Nutrition",
      "Cooking",
      "Exercise",
      "Rest and recovery",
      "Stress management",
      "First aid",
    ],
    evidence: "Fitness logs, meal plans, certs, training videos, wellbeing journal.",
  },
  {
    slug: "creative-expression",
    title: "Creative Expression",
    number: "8",
    coreOutcomes: [
      "Appreciate and explore diverse creative forms",
      "Express ideas and emotions through multiple media",
    ],
    competencies: [
      "Visual arts",
      "Storytelling",
      "Creative writing",
      "Music",
      "Iteration and revision",
      "Creative risk-taking",
    ],
    evidence: "Portfolio pieces, performances, process journals, peer critiques.",
  },
  {
    slug: "technology-media-ai-literacy",
    title: "Technology, Media & AI Literacy",
    number: "9",
    coreOutcomes: [
      "Use tech as a tool, not a crutch",
      "Collaborate effectively with AI and digital systems",
      "Stay safe, skeptical, and adaptive in a fast-moving digital world",
    ],
    competencies: [
      "Digital navigation",
      "AI collaboration",
      "Online safety",
      "Troubleshooting",
      "Information literacy",
      "Attention control",
    ],
    evidence: "Code commits, content channels, audits, tutorials, working digital artifacts.",
  },
  {
    slug: "life-skills-project-execution",
    title: "Life Skills & Project Execution",
    number: "10",
    coreOutcomes: [
      "Be capable, adaptable, and self-reliant in real-world settings",
      "Execute ideas from concept to reality",
    ],
    competencies: [
      "Planning and logistics",
      "Household management",
      "Travel independence",
      "DIY and repair",
      "Self-advocacy",
      "Project ownership",
    ],
    evidence: "Trip plans, repair photos, dashboards, retrospectives, completed projects.",
  },
];

const HOME_FAQ_ITEMS = [
  {
    label: "Starting Point",
    question: "What are you running toward, not just away from?",
    answer:
      "Capable, self-directed humans who can own their lives. School is the foil, not the mission. The target is a young adult who can function, think, adapt, build relationships, manage health and money, and keep learning without waiting to be managed.",
  },
  {
    label: "Plain English",
    question: "What does floor-complete mean?",
    answer:
      "It means the kid can function in the real world. Dropped into a new city at 18, they would ask good questions, solve problems, handle money, navigate systems, and keep moving instead of freezing or waiting to be managed.",
  },
  {
    label: "Common Objection",
    question: "Is this just unschooling with a nicer name?",
    answer:
      "No. The Floor is a real contract, not a vibe. The Domains are a real coverage map, not trust-the-process hand-waving. Kids get increasing ownership, but responsibility never becomes the same thing as absence of structure.",
  },
  {
    label: "How It Fits",
    question: "How do the Why, Floor, By 18, and Domains fit together?",
    answer:
      "The Why names the target. The Floor defines the non-negotiable minimum by 18. By 18 translates that contract into plain public language. The Domains are the broader capability map so important areas of life do not get neglected.",
  },
] as const;

const QA_DATA = {
  "intro": [
    "These are the questions we get asked most, plus the questions we think serious readers should ask even if they usually do not. *Quick scan, not exhaustive policy manual.* The Why is the main public-facing piece. This Q&A exists to make the public position plain, test it against obvious objections, and keep the core distinctions clean: the Floor is the contract, the Domains are the broader map, and the system stays light on purpose."
  ],
  "sections": [
    {
      "heading": "Start here: what this is",
      "items": [
        {
          "question": "What are you running toward, not just away from?",
          "answer": [
            "We are running toward capable, self-directed humans who can own their lives. School is the foil, not the mission. The target is a young adult who can function, think, adapt, build relationships, manage health and money, and keep learning without waiting to be managed."
          ]
        },
        {
          "question": "What are the six priorities you are optimizing for?",
          "answer": [
            "Agency, Capability, Optionality, Integrity, Health, and Belonging. Those priorities are the point of the system. The Floor, the Domains, and the day-to-day mechanics all serve those priorities rather than replacing them."
          ]
        },
        {
          "question": "What does \"floor-complete\" mean in plain English?",
          "answer": [
            "It means the kid can function in the real world. If you dropped them into a new city at 18, they would not panic. They would ask good questions, solve problems, handle money, navigate systems, and keep moving."
          ]
        },
        {
          "question": "How do the Why, Floor, By 18, and Domains fit together?",
          "answer": [
            "The Why names the target. The Floor defines the non-negotiable minimum by 18. By 18 is the plain-language translation of that contract. The Domains are the broader capability map so important areas of life do not get neglected."
          ]
        },
        {
          "question": "What is the three-layer model?",
          "answer": [
            "In short: Minimum capability, broad lived cultivation, then self-directed depth.",
            "LifeEducation works across three layers: Floor Completion, Domain Cultivation, and Depth / Specialization. The Floor is the minimum adulthood contract. Domain Cultivation is the broader lived environment that keeps the domains in the air kids breathe. Depth is where the young person later chooses what to push hard."
          ]
        },
        {
          "question": "Why name the middle layer at all?",
          "answer": [
            "In short: The hard part is not naming the minimum. It is building the life around it.",
            "Because the old two-layer language made it sound like there was only the minimum and then whatever came later. In real life, the hard part is the middle: building a broad, lived environment rich enough that competence becomes normal rather than school-style coverage."
          ]
        },
        {
          "question": "What does \"LifeEducation is the OS\" mean?",
          "answer": [
            "It means the environment can change while the target stays stable. School, homeschool, travel, sports, apprenticeships, co-ops, or local community life are different environments. The OS is the stable set of priorities, guardrails, and competence targets that keeps the whole thing coherent."
          ]
        },
        {
          "question": "Who is this for, and who is it not for?",
          "answer": [
            "It is for families who want a serious alternative to default schooling without turning life into a giant curriculum. It is not for families looking for a packaged program, a permission slip to disengage, or a guarantee that no hard decisions will be required."
          ]
        },
        {
          "question": "Are you trying to prescribe one path for everyone?",
          "answer": [
            "No. We are documenting our path and our reasoning, not claiming there is only one valid way to raise capable adults. The value is in the target, the guardrails, and the clarity---not in pretending everyone should copy the same implementation."
          ]
        }
      ]
    },
    {
      "heading": "The obvious objections",
      "items": [
        {
          "question": "Are you anti-school?",
          "answer": [
            "No. School can be one environment among many. The critique is not that every school experience is worthless. The critique is that school, by itself, is often a weak proxy for actual adulthood capability."
          ]
        },
        {
          "question": "Is this just unschooling with a nicer name?",
          "answer": [
            "No. The Floor is a real contract, not a vibe. The Domains are a real coverage map, not \"trust the process\" hand-waving. Kids get increasing ownership, but responsibility never becomes the same thing as absence of structure."
          ]
        },
        {
          "question": "What if they only learn how to game the Floor?",
          "answer": [
            "In short: Even the \"worst-case\" version is still a serious adulthood standard, not paper compliance.",
            "First, that is harder than it sounds if the Floor is honest. Second, even the fallback case is still a stronger result than paper success without dependable capability. The Floor is not the aspiration. It is the minimum line below which adulthood should not be claimed."
          ]
        },
        {
          "question": "So is the Floor your aspiration or your fallback?",
          "answer": [
            "It is the contract. It is deliberately the minimum, not the ceiling. The aspiration is a broader life: domain cultivation now, self-directed depth later. But the fallback still matters because it is a serious adulthood standard."
          ]
        },
        {
          "question": "Isn't this lowering the bar by rejecting conventional standards?",
          "answer": [
            "No. It is changing the bar from seat time and compliance to demonstrated capability. The system is stricter about real-world function and less impressed by paper signals standing alone."
          ]
        },
        {
          "question": "How do you avoid blind spots if parents are choosing the environment?",
          "answer": [
            "You use the Domains to expose neglected areas, outside adults to widen perspective, honest evidence to keep claims grounded, and review rhythms to catch drift before it becomes identity."
          ]
        },
        {
          "question": "How do you avoid indoctrination?",
          "answer": [
            "No system is neutral. The best defense is not pretending neutrality exists. It is raising kids who can read critically, compare claims, notice power, argue fairly, and revise their views when reality pushes back."
          ]
        },
        {
          "question": "Isn't this elitist or only for privileged families?",
          "answer": [
            "Some versions will require more time or money than others, but the core model is not a luxury brand. Most of the strongest levers are not expensive: responsibility, reading, movement, projects, honest expectations, community structures, and practical documentation. The system should work at low budget, not only high budget."
          ]
        },
        {
          "question": "Isn't this just helicopter parenting with better language?",
          "answer": [
            "It can become that if the parent never transfers ownership. The system is built to do the opposite: increasing responsibility over time, clear readiness-based bands, and an eventual post-floor charter where the young person drives."
          ]
        },
        {
          "question": "Why not just let kids be kids?",
          "answer": [
            "Kids should absolutely get childhood, play, joy, and room to breathe. The question is whether childhood is preparing them for adulthood or merely delaying it. LifeEducation is trying to preserve childhood without outsourcing responsibility for the future."
          ]
        },
        {
          "question": "How is this different from Charlotte Mason, classical, Montessori, or other named approaches?",
          "answer": [
            "It can borrow useful practices from many approaches, but it is not reducible to any one of them. What makes it distinct is the Floor contract, the domain coverage map, the three-layer model, and the operating logic that keeps the whole thing coherent across different environments."
          ]
        },
        {
          "question": "What research supports this?",
          "answer": [
            "In short: This is a first-principles system, not a rebranded research program.",
            "This is not built from one branded pedagogy or one study. It is built from first principles about what adulthood requires and from practical observations about how capability actually forms: repeated reps, real stakes, transfer of ownership, and lived application. Some component ideas are common and well-supported. The system itself is ours."
          ]
        }
      ]
    },
    {
      "heading": "The daily-life reality",
      "items": [
        {
          "question": "What does this actually look like in normal life?",
          "answer": [
            "Real responsibilities, real movement, real projects, real community, real conflict, real repair, real curiosity, and real follow-through. Not every day is dramatic. The point is that daily life itself is doing most of the work."
          ]
        },
        {
          "question": "How do you balance freedom and structure?",
          "answer": [
            "Structure is the rail: sleep, movement, contribution, basic reps, integrity, and follow-through. Freedom lives inside that rail: topic choice, pace, projects, experiments, and later depth."
          ]
        },
        {
          "question": "How do you avoid becoming controlling?",
          "answer": [
            "By treating control as temporary scaffolding rather than a permanent identity. If the parent still chooses everything at 16, the system failed. Ownership has to transfer year by year."
          ]
        },
        {
          "question": "What is the parent's role, really?",
          "answer": [
            "The parent is less \"teacher delivering lessons\" and more environment architect: choosing contexts, noticing openings, arranging exposure, sequencing challenge, and closing loops when life presents something worth learning from."
          ]
        },
        {
          "question": "What does a normal week look like?",
          "answer": [
            "Some form of movement, reading, writing or communication, math-in-life, contribution, and project time, plus steady community commitments. The exact week can look different in school, homeschool, or travel. The point is the pattern, not the perfect schedule."
          ]
        },
        {
          "question": "What if life gets messy---travel, sickness, burnout, family stress?",
          "answer": [
            "Then the system should shrink, not disappear. Minimum viable check-ins, lighter weeks, fewer threads, smaller outputs, and later resets are part of the design. A system that only works in calm weeks is not a real system."
          ]
        },
        {
          "question": "What about screens, internet, and phones?",
          "answer": [
            "Tech is a tool, not the center of gravity. Clamp down on passive consumption, protect sleep and movement, and allow creation, learning, coordination, and connection with boundaries that actually work."
          ]
        },
        {
          "question": "What if my kid resists everything?",
          "answer": [
            "First check for friction and overload before moralizing. Reduce complexity, shorten the loop, and diagnose capacity honestly. If the issue is true avoidance, tighten structure temporarily and make the next step smaller and clearer."
          ]
        },
        {
          "question": "What if my kid says they just want the minimum?",
          "answer": [
            "The answer depends on age and readiness. Before the Floor is met, the minimum is not negotiable. After that, the post-floor contract keeps maintenance and real outputs alive while depth becomes more self-directed. Freedom grows with reliability, not with rhetoric."
          ]
        },
        {
          "question": "What if I am not organized enough for this?",
          "answer": [
            "Then start thinner than you think. The first goal is not elegance. It is keeping one small loop alive long enough that it becomes boring: a light daily log, a weekly review, and one thread."
          ]
        },
        {
          "question": "What happens if a kid is clearly not on track for the Floor by 15 or 16?",
          "answer": [
            "In short: Late drift is not a branding problem. It is a floor-critical intervention problem.",
            "Then you stop pretending broad enrichment will magically close a concrete gap. Narrow scope. Baseline honestly. Close the biggest floor-critical gaps first. Use direct instruction, extra reps, formal verification, outside help, or a more compliance-heavy path if that is what it takes. The point is not to protect the parent's preferred style. The point is to get the kid across the contract line in reality."
          ]
        },
        {
          "question": "How do you handle multiple kids at different levels?",
          "answer": [
            "By sharing environments where you can, while keeping expectations, responsibility, and ownership separate. Same trip, different roles. Same project thread, different scope. Same family standards, different readiness bands. The system should scale by adjusting the ask, not by pretending every kid is on the same timeline."
          ]
        },
        {
          "question": "What do your kids think about this?",
          "answer": [
            "Right now they are young. The system is being built before they can meaningfully evaluate it in its full form. The point is not to impose a permanent parent ideology on toddlers. The point is to build an environment that becomes increasingly theirs over time."
          ]
        },
        {
          "question": "What if your kids turn out to hate this and resent it?",
          "answer": [
            "That risk exists in every system, including conventional school. No model guarantees gratitude. The goal here is not to guarantee that kids always like the structure. The goal is to keep the structure honest, reality-based, and increasingly owned by them rather than permanently imposed from above."
          ]
        },
        {
          "question": "What about math curriculum specifically? Do you use one?",
          "answer": [
            "Method is secondary. Benchmarks are not. We care that the kid reaches the math floor---mental math, percentages, estimates, charts, Algebra I, Geometry, and real-world quantitative judgment. A family might use a formal curriculum, tutoring, online tools, school classes, or a mix. The system is agnostic about method and strict about whether the capability becomes real."
          ]
        },
        {
          "question": "What about reading? Do you have a book list?",
          "answer": [
            "No canonical list. We care more about what reading is doing than whether it comes from one approved shelf. The kid should read broadly enough and deeply enough that adult-level comprehension becomes real, while also having space to read things they choose and love. Lists can help. They are not the point."
          ]
        }
      ]
    },
    {
      "heading": "Evidence, documentation, and AI",
      "items": [
        {
          "question": "Why document anything at all?",
          "answer": [
            "Because if you are outside default schooling, clarity and legibility matter. Inside the family, documentation makes the target explicit. Outside the family, it makes real capability visible without turning life into theater."
          ]
        },
        {
          "question": "What do you actually document?",
          "answer": [
            "A light trail: annual summaries, notable writing, major projects, work or volunteer history, references when relevant, and any formal courses, tests, or certifications that genuinely reduce friction for the kid's chosen path."
          ]
        },
        {
          "question": "How do you show progress without grades?",
          "answer": [
            "Samples over time, outputs, responsibility, and clearer capability. If the kid can do more, explain more, build more, and manage more than last year, progress is real even without a gradebook."
          ]
        },
        {
          "question": "How much evidence is enough?",
          "answer": [
            "In short: Enough to steer, verify, and protect doors. Not enough to photograph life into submission.",
            "Enough to change decisions, protect optionality later, and prove important claims if needed. Not enough to turn life into constant capture. Evidence is insurance, not a scoreboard."
          ]
        },
        {
          "question": "What are \"strong artifacts\"?",
          "answer": [
            "Examples include a revised essay, a research presentation, a budget with reflection, a real build, a science notebook, a creative portfolio, a service log, a project plan, a work reference, or a documented repair. In other words: outputs that make capability visible."
          ]
        },
        {
          "question": "Where do tests, classes, and certifications fit?",
          "answer": [
            "As tools, not the center. If a class, exam, or cert reduces friction for a real path, use it. If it is just theater, skip it. The rule is not \"avoid formal signals.\" The rule is \"do not confuse them with the target.\""
          ]
        },
        {
          "question": "How is AI used?",
          "answer": [
            "As a tool for idea generation, feedback, coaching, simplification, pattern spotting, drafting support, and admin help. It is not allowed to replace the kid's understanding, judgment, or proof of capability."
          ]
        },
        {
          "question": "What if you suspect AI ghostwriting?",
          "answer": [
            "Run a short integrity check: teach-back, defend-it, provenance, drafts, timestamps, and one next step if the kid cannot defend the work. Repeated issues are treated as workflow problems, not as a reason to let the fake work stand."
          ]
        },
        {
          "question": "Is this a surveillance system?",
          "answer": [
            "No. Default capture stays coarse, privacy stays high, and kid effort stays low. The purpose of evidence is to make capability legible and steer decisions, not to photograph life into submission."
          ]
        },
        {
          "question": "So what is the public version of all this?",
          "answer": [
            "The public-facing stack is the Why, By 18, the Domains, and this Q&A. The detailed operating system exists behind that for families who need the mechanics, but the public case should stay human-readable."
          ]
        },
        {
          "question": "Who decides if the Floor is actually met?",
          "answer": [
            "In short: Primary judgment stays with the family, but high-stakes claims need stronger proof than confidence.",
            "The family using the system has primary responsibility for that judgment, but not by vibes. Floor claims should be tied to real evidence, direct performance, and---where the stakes are higher---short challenge checks, outside proof, or formal benchmarks. For some doors, outside systems will still matter. That is fine. The internal claim should still be honest before the external one ever shows up."
          ]
        }
      ]
    },
    {
      "heading": "Pathways and keeping doors open",
      "items": [
        {
          "question": "How do you keep doors open without letting credentials run the show?",
          "answer": [
            "Real competence first, then minimal honest documentation so that competence is legible later. Credentials are tools. They are not the target."
          ]
        },
        {
          "question": "If my kid wants selective college later, what matters?",
          "answer": [
            "Strong writing, demonstrated readiness, real depth in something meaningful, and a coherent story. The point is not to game admissions. It is to make real competence visible in a format that selective systems can understand."
          ]
        },
        {
          "question": "What if my kid wants trades or apprenticeships?",
          "answer": [
            "Reliability, safety mindset, hands-on competence, references, and proof you can actually work. Portfolios, logs, certs, and mentor testimony often matter more there than conventional credit language."
          ]
        },
        {
          "question": "What if they want military options?",
          "answer": [
            "Then paperwork, eligibility, documentation, fitness, and clean records matter. That path is more compliance-heavy than others, so the value of early clarity is simply that fewer surprises show up late."
          ]
        },
        {
          "question": "What about athletics?",
          "answer": [
            "Time gets scarce. Protect health, keep the basics from rotting, understand eligibility rules early, and do not let a performance path hollow out the rest of the person."
          ]
        },
        {
          "question": "What if they want to return to traditional school?",
          "answer": [
            "Keep the documentation clean and the skills real. Re-entry is easiest when you have proof of competence and you did not ignore basic requirements."
          ]
        },
        {
          "question": "What if they do not know what they want yet?",
          "answer": [
            "That is normal. The point of the Floor and the Domains is to keep optionality alive long enough that later choices are real rather than panic-driven."
          ]
        },
        {
          "question": "How do you handle kids who reach the Floor early?",
          "answer": [
            "You do not pretend the work is over. You shift the emphasis toward broader domain cultivation and self-directed depth while keeping maintenance and truth-telling alive."
          ]
        },
        {
          "question": "Why talk about \"doors\" at all?",
          "answer": [
            "Because some future options close accidentally and expensively. The point is not to script a career. It is to avoid closing paths by neglect when keeping them open was reasonable."
          ]
        }
      ]
    },
    {
      "heading": "Community, socialization, and belonging",
      "items": [
        {
          "question": "What does socialization mean here in reality, not theory?",
          "answer": [
            "Relationships, roles, shared work, and repeated contact. School is one social system. It is not automatically the best one."
          ]
        },
        {
          "question": "What about friends?",
          "answer": [
            "Friends come from steady shared time and shared effort, not only from sitting in the same room by birth year. That is why we value teams, clubs, gyms, jobs, volunteer groups, neighbors, extended family, and repeated community structures."
          ]
        },
        {
          "question": "Why value multi-age socialization?",
          "answer": [
            "Because real life is multi-age. Kids learn to lead, follow, negotiate, and belong better when they interact with younger and older people, not only peers in one same-age batch."
          ]
        },
        {
          "question": "How do you build community without school as the default?",
          "answer": [
            "Join structures that meet regularly and matter: sport gyms, clubs, volunteer organizations, maker spaces, lessons, debate, jobs, church if relevant, neighborhoods, and family networks."
          ]
        },
        {
          "question": "Won't kids miss out on school culture?",
          "answer": [
            "They may miss some school-specific culture. The question is whether school culture is the target. We care more about real belonging, real roles, and real relationships than about access to one particular youth institution."
          ]
        },
        {
          "question": "What about conflict, hard adults, and disappointment?",
          "answer": [
            "Good. They need some of that. A rich environment includes mentors, coaches, teammates, officials, service roles, and systems that do not instantly bend to the kid. That is part of how judgment and resilience get built."
          ]
        },
        {
          "question": "How do you avoid social isolation on the road or in homeschooling?",
          "answer": [
            "By designing for continuity rather than novelty alone: recurring communities, repeated places when possible, steady training groups, and adults who know the kid well enough to notice real growth."
          ]
        },
        {
          "question": "What if my kid is shy or awkward?",
          "answer": [
            "Then you respect temperament without mistaking it for exemption. The goal is not to make every kid socially flashy. The goal is that they can function, ask for what they need, and build working relationships in the real world."
          ]
        }
      ]
    },
    {
      "heading": "Legality, ethics, and agenda-driven questions",
      "items": [
        {
          "question": "Is this legal?",
          "answer": [
            "Usually some version is legal, but requirements vary by state and country. Verify locally, keep clean records, and do not build your plan on internet folklore. We are not lawyers. Check with a qualified attorney, homeschool regulatory body, or equivalent local authority before betting your child's path on assumptions."
          ]
        },
        {
          "question": "How do you stay ethical?",
          "answer": [
            "Do not fake documents. Do not claim learning that did not happen. Do not hide weakness behind branding language. Meet the legal minimums where you live and keep honest evidence of real work."
          ]
        },
        {
          "question": "What if you move states or countries?",
          "answer": [
            "Treat it like a system change. Re-check requirements, translate your documentation into the new system's language, and keep your portfolio and summaries as the constant."
          ]
        },
        {
          "question": "Are you anti-teacher?",
          "answer": [
            "No. Good teachers, coaches, mentors, and specialists matter a lot. The critique is about overreliance on one institution, not contempt for people who teach well."
          ]
        },
        {
          "question": "Are you anti-college?",
          "answer": [
            "No. College is one pathway among several. The goal is not to rebel against college. The goal is to make later choices deliberate rather than default."
          ]
        },
        {
          "question": "Are you anti-credential?",
          "answer": [
            "No. Credentials are useful when they serve a real purpose. We are anti-credentialism: the habit of treating paper signals as a substitute for competence."
          ]
        },
        {
          "question": "Is this a backdoor way to shelter kids from ideas you dislike?",
          "answer": [
            "It should not be. The system is strongest when it raises kids who can encounter competing ideas, compare them fairly, and think for themselves rather than merely inherit a tribe."
          ]
        },
        {
          "question": "What if a family uses this language to justify neglect?",
          "answer": [
            "Then they are violating the system, not proving it wrong. The Floor is a contract. Broad language about freedom or flexibility does not erase the requirement that capability must become real."
          ]
        },
        {
          "question": "What if a parent just wants their kid to look impressive online?",
          "answer": [
            "That is exactly why the system distinguishes outputs from theater and evidence from performance. Real work matters. Documentation is secondary. If the display is doing more work than the life, the system has gone off the rails."
          ]
        }
      ]
    },
    {
      "heading": "Constraints, special situations, and hard cases",
      "items": [
        {
          "question": "What if both parents work full-time?",
          "answer": [
            "Then you design for leverage: routines, recurring community structures, coaches, mentors, shared responsibility, and a smaller, lighter operating loop. The goal is not parent-as-full-time-teacher. It is a rich environment with guardrails."
          ]
        },
        {
          "question": "What does this cost?",
          "answer": [
            "It can be near-zero or expensive depending on choices. Time is usually the larger cost early on. A family using public libraries, community sports, open-source tools, local volunteering, and home responsibilities as primary environments can do a lot for very little beyond normal living costs."
          ]
        },
        {
          "question": "What about neurodivergence or special needs?",
          "answer": [
            "Bands are readiness-based, not age-based. If a kid needs more structure, co-regulation, fewer threads, or slower transfer of ownership, that is not failure. It means the system should fit the kid's brain instead of pretending one timeline fits everyone."
          ]
        },
        {
          "question": "What if my kid has a diagnosed disability that makes some Floor requirements unrealistic?",
          "answer": [
            "In short: Accommodation can change the route and the proof. It cannot justify fantasy claims.",
            "Then you do not solve that by pretending the issue does not exist. You decide what can be accommodated, what still has to become real in some form, and what outside support or modified route is required. The principle stays: the goal is honest adulthood capability, not fake sameness. The exact proof may change. The obligation to tell the truth does not."
          ]
        },
        {
          "question": "What if my kid is 14 and we are starting late?",
          "answer": [
            "Start thinner, not harder. Build the smallest stable loop first, baseline honestly against the Floor, and close the biggest capability gaps first. Late start changes pacing, not the destination."
          ]
        },
        {
          "question": "What if I am burned out?",
          "answer": [
            "Then the system has to shrink without disappearing. One daily check-in, one weekly review, one thread, and fewer ambitions is better than pretending you can run a beautiful system on empty."
          ]
        },
        {
          "question": "What if we try this and hate it?",
          "answer": [
            "Then treat it like a pilot. Keep what reduced stress and increased capability, drop what created drag, redesign once, and simplify if needed. The point is to serve life, not win at framework maintenance."
          ]
        },
        {
          "question": "What if the kid just wants conventional school?",
          "answer": [
            "Then school may be the right environment for that season. The OS can still sit on top of school if the family wants the Why, the Floor, and the broader target to stay in view."
          ]
        },
        {
          "question": "What if slow travel never happens?",
          "answer": [
            "Nothing breaks. Travel is one possible lab, not the goal. The environment can change. The target stays."
          ]
        },
        {
          "question": "Is this really just a justification for pulling kids out of school to travel?",
          "answer": [
            "No. Travel is one possible environment, not the reason the system exists. The Why, the Floor, and the Domains all make sense without travel. Travel is valuable when it deepens life. It is not valuable merely because it is mobile or unusual."
          ]
        },
        {
          "question": "What if this all sounds too idealistic?",
          "answer": [
            "That is fair. The answer is not to claim perfection. The answer is to start small, keep the standard honest, and make the next real decision better than the default one."
          ]
        }
      ]
    }
  ],
  "bottom": [
    "LifeEducation is not trying to win a branding contest. It is trying to produce young adults who can function, think, adapt, and build. The Floor is the minimum contract. The Domains keep the full picture in view. The broader environment is what makes that picture real. And the point of this Q&A is simple: make the public position clear enough that the project can be judged on what it is actually trying to do."
  ]
} as const;

function SiteNav() {
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-link">Home</a>
        <a href="/why" className="site-nav-link">Why</a>
        <a href="/floor" className="site-nav-link">Floor</a>
        <a href="/by-18" className="site-nav-link">By 18</a>
        <a href="/domains" className="site-nav-link">Domains</a>
        <a href="/qa" className="site-nav-link">Q&amp;A</a>
      </div>
    </nav>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <div className="shell">
        <header className="header">
          <a href="/" aria-label="LifeEducation home">
            <h1 className="brand">LifeEducation.org</h1>
          </a>
        </header>
        <SiteNav />
        {children}
      </div>
    </div>
  );
}

function PageIntro({
  pill,
  title,
  subtitle,
  notice,
}: {
  pill: string;
  title: string;
  subtitle?: string;
  notice?: string;
}) {
  return (
    <section className="doc-hero">
      <div className="doc-pill">{pill}</div>
      <h1 className="doc-title">{title}</h1>
      {subtitle ? <p className="doc-subtitle">{subtitle}</p> : null}
      {notice ? <div className="doc-notice">{notice}</div> : null}
    </section>
  );
}

function BackBar({ children }: { children: ReactNode }) {
  return <section className="back-bar">{children}</section>;
}

function RichSection({
  heading,
  body,
  bullets,
  footer,
}: {
  heading: string;
  body?: string[];
  bullets?: string[];
  footer?: string;
}) {
  return (
    <section className="doc-section">
      <h2 className="doc-section-title">{heading}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph} className="doc-section-text">
          {paragraph}
        </p>
      ))}
      {bullets?.length ? (
        <ul className="doc-list">
          {bullets.map((item) => (
            <li key={item} className="doc-list-item">
              <span className="doc-list-dot" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {footer ? <p className="doc-section-text">{footer}</p> : null}
    </section>
  );
}

function HomePage() {
  return (
    <PageShell>
      <div className="hero">
        <section className="hero-copy">
          <div className="copy-inner">
            <div className="pill">LifeEducation</div>
            <h2 className="hero-title">
              If you dropped them off in a strange city on a different continent, could they figure it out?
            </h2>
            <p className="hero-text">
              Too much of the current system still rewards looking good on paper. I’m trying to raise kids who can think, adapt, solve problems, and function in real life.
            </p>
          </div>
        </section>
        <section className="hero-art">
          <div className="art-card">
            <div className="tree-wrap">
              <img src="/lifeeducation_tree_source.webp" alt="" aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>
      <section className="image-break">
        <div className="image-break-inner">
          <img className="image-break-img" src="/lifeeducation_break_navigator.webp" alt="Young person navigating a foreign city with a map" />
        </div>
      </section>
      <section className="why">
        <div className="why-grid">
          <div className="why-copy">
            <div className="why-pill">The Why</div>
            <h3 className="why-title">Most education talk starts in the wrong place.</h3>
            <p className="why-text">
              It starts with school. Or curriculum. Or standards. Or credentials. The better starting point is simpler: what should an 18-year-old actually be able to do, on their own, in real life?
            </p>
            <p className="why-text">
              Skip the school reform debate. Name a better target and build around it directly. The goal is real capability, autonomy, and judgment.
            </p>
            <a className="why-button" href="/why">Read the Why Statement</a>
          </div>
          <div className="why-cards">
            <div className="why-card">
              <div className="why-card-label">Target</div>
              <div className="why-card-title">The Floor is the contract.</div>
              <div className="why-card-text">Minimum adulthood capability by 18. Serious, non-negotiable, and not disguised curriculum theater.</div>
            </div>
            <div className="why-card">
              <div className="why-card-label">Priorities</div>
              <div className="why-card-title">Agency. Capability. Optionality.</div>
              <div className="why-card-text">Integrity, Health, and Belonging complete the set. The system exists to serve those six priorities.</div>
            </div>
            <div className="why-card">
              <div className="why-card-label">Shape</div>
              <div className="why-card-title">Keep it light.</div>
              <div className="why-card-text">A better target, clear guardrails, and a life where real things happen on purpose. That’s it.</div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="faq-head">
          <div className="faq-pill">Q&amp;A</div>
          <h3 className="faq-title">The questions a serious parent or skeptic should ask.</h3>
          <p className="faq-text">Better to answer them plainly than hide the big distinctions under branding. These are the short versions; the full Q&amp;A now has the complete public FAQ.</p>
        </div>
        <div className="faq-grid">
          {HOME_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="faq-card">
              <div className="faq-card-label">{item.label}</div>
              <div className="faq-card-title">{item.question}</div>
              <div className="faq-card-text">{item.answer}</div>
            </div>
          ))}
        </div>
        <a className="why-button" href="/qa">Read the full Q&amp;A</a>
      </section>
      <section className="floor-section">
        <div className="floor-head">
          <div className="floor-pill">The Floor + By 18</div>
          <h3 className="floor-title">The contract, and By 18, its public translation.</h3>
          <p className="floor-text">The Floor is the non-negotiable minimum by 18. By 18 says the same thing in plain language.</p>
        </div>
        <div className="floor-grid">
          <div className="floor-card">
            <div className="floor-card-label">The contract</div>
            <div className="floor-card-title">The 18-Year-Old Floor</div>
            <div className="floor-card-text">This is the minimum line for adulthood capability.</div>
            <a className="floor-card-button" href="/floor">Read the Floor document</a>
          </div>
          <div className="floor-card floor-card-accent">
            <div className="floor-card-label">Public translation</div>
            <div className="floor-card-title">By 18: What You Can Do</div>
            <div className="floor-card-text">This is the same contract in plain public language.</div>
            <a className="floor-card-button floor-card-button-accent" href="/by-18">Read the By 18 document</a>
          </div>
        </div>
      </section>
      <section className="domains">
        <div className="domains-head">
          <div className="domains-pill">The 10 Domains</div>
          <h3 className="domains-title">The Floor is the minimum.<br />The Domains show the full map.</h3>
          <p className="domains-text">The Domains are here to keep blind spots visible.</p>
          <p className="domains-text">They are not a second contract. The Floor is still the minimum.</p>
        </div>
        <div className="domains-grid">
          {DOMAINS.map((domain) => (
            <a key={domain.slug} href={`/domains/${domain.slug}`} className="domains-item domains-item-link">
              <span className="domains-item-number">{domain.number}</span>
              <span>{domain.title}</span>
            </a>
          ))}
        </div>
        <div className="domains-note">Contract first. Full map second.</div>
        <a className="domains-button" href="/domains">Read the Domains document</a>
      </section>
      <section className="image-break">
        <div className="image-break-inner">
          <img className="image-break-img" src="/site_break_02_contact_desk.webp" alt="Documents, notes, and letters prepared for serious public exchange" />
        </div>
      </section>
      <section className="contact">
        <div className="contact-grid">
          <div className="contact-copy">
            <div className="contact-pill">Contact</div>
            <h3 className="contact-title">If you see something I’m missing, tell me.</h3>
            <p className="contact-text">I’m building this for my own kids first. If you see a blind spot, a hole in the logic, or a better way to say something, send it.</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-label">Public contact</div>
            <div className="contact-card-line"><a href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div>
            <div className="contact-card-note">Use this address for objections, ideas, examples, or serious feedback.</div>
            <a className="contact-card-cta" href="mailto:LifeEducationInformation@gmail.com?subject=LifeEducation%20Website%20Feedback">Email your thoughts</a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-text">© LifeEducation.org</div>
          <a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a>
        </div>
      </footer>
    </PageShell>
  );
}

function WhyPage() {
  return (
    <PageShell>
      <PageIntro pill="The Why" title={WHY_DATA.title} subtitle={WHY_DATA.subtitle} />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        {WHY_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      {WHY_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

function By18Page() {
  return (
    <PageShell>
      <PageIntro pill="By 18" title={BY18_DATA.title} subtitle={BY18_DATA.subtitle} />
      <BackBar>
        <div className="back-link-row"><a href="/" className="back-link">← Back to Home</a><a href="/floor" className="back-link">View the Floor</a></div>
      </BackBar>
      <section className="doc-dark">
        {BY18_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
        <p className="doc-dark-text doc-dark-lead">{BY18_DATA.lead}</p>
      </section>
      {BY18_DATA.groups.map((group) => (
        <section key={group.title} className="doc-section">
          <h2 className="doc-section-title">{group.title}</h2>
          <ul className="doc-list">
            {group.items.map((item) => (
              <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item}</span></li>
            ))}
          </ul>
        </section>
      ))}
      <section className="doc-section doc-section-alt">
        {BY18_DATA.closing.map((paragraph) => (
          <p key={paragraph} className="doc-section-text doc-closing-text">{paragraph}</p>
        ))}
      </section>
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

function FloorPage() {
  return (
    <PageShell>
      <PageIntro pill="The Floor" title={FLOOR_DATA.title} subtitle={FLOOR_DATA.subtitle} notice={FLOOR_DATA.notice} />
      <BackBar>
        <div className="back-link-row"><a href="/" className="back-link">← Back to Home</a><a href="/by-18" className="back-link">View By 18</a></div>
      </BackBar>
      <section className="doc-dark">
        {FLOOR_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      {FLOOR_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title="10-Domain Learning Outcomes Framework" subtitle="Broader map, not a second contract" />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">The Floor defines the non-negotiable minimum. The Domains describe the fuller landscape: core outcomes, key competencies, and evidence examples.</p>
        <p className="doc-dark-text">Not everything here is required. The Floor remains the final word on what is mandatory.</p>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">The 10 Core Learning Domains</h2>
        <div className="domain-page-grid">
          {DOMAINS.map((domain) => (
            <a key={domain.slug} href={`/domains/${domain.slug}`} className="domain-page-card">
              <div className="domain-page-card-number">{domain.number}</div>
              <div className="domain-page-card-title">{domain.title}</div>
              <div className="domain-page-card-note">Open full domain details</div>
            </a>
          ))}
        </div>
      </section>
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

function DomainDetailPage({ slug }: { slug: string }) {
  const domain = DOMAINS.find((item) => item.slug === slug);

  if (!domain) {
    return (
      <PageShell>
        <PageIntro pill="Domain Detail" title="Domain not found" subtitle="That domain page does not exist yet." />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageIntro pill="Domain Detail" title={domain.title} subtitle="Broader map page, not the minimum contract." />
      <BackBar>
        <div className="back-link-row"><a href="/domains" className="back-link">← Back to Domains</a><a href="/" className="back-link">Back to Home</a></div>
      </BackBar>
      <section className="doc-dark"><p className="doc-dark-text">This page shows the broader domain map: core outcomes, key competencies, and evidence examples. The Floor still defines the minimum contract.</p></section>
      <section className="doc-section">
        <h2 className="doc-section-title">Core Outcomes</h2>
        <ul className="doc-list">
          {domain.coreOutcomes.map((item) => (
            <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <section className="doc-section doc-section-alt">
        <h2 className="doc-section-title">Key Competencies</h2>
        <ul className="doc-list">
          {domain.competencies.map((item) => (
            <li key={item} className="doc-list-item"><span className="doc-list-dot" /><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <section className="doc-section">
        <h2 className="doc-section-title">Evidence Examples</h2>
        <p className="doc-section-text">{domain.evidence}</p>
      </section>
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

function QAPage() {
  return (
    <PageShell>
      <PageIntro pill="Q&A" title="LifeEducation Q&A" subtitle="Plain answers to the obvious objections" />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        {QA_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      {QA_DATA.sections.map((section, sectionIndex) => (
        <section key={section.heading} className={sectionIndex % 2 === 0 ? "doc-section" : "doc-section doc-section-alt"}>
          <h2 className="doc-section-title">{section.heading}</h2>
          <div className="qa-list">
            {section.items.map((item) => (
              <article key={item.question} className="qa-item">
                <h3 className="qa-question">{item.question}</h3>
                {item.answer.map((paragraph) => (
                  <p key={paragraph} className="qa-answer">{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>
      ))}
      <section className="doc-dark">
        {QA_DATA.bottom.map((paragraph) => (
          <p key={paragraph} className="doc-dark-text">{paragraph}</p>
        ))}
      </section>
      <footer className="footer"><div className="footer-inner"><div className="footer-text">© LifeEducation.org</div><a className="footer-link" href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a></div></footer>
    </PageShell>
  );
}

export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = TREE_FAVICON;
  }, []);

  const [pathname, setPathname] = useState<string>(() => window.location.pathname || "/");

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname || "/");
    window.addEventListener("popstate", onPopState);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("#")) return;
      event.preventDefault();
      if (href !== window.location.pathname) {
        window.history.pushState({}, "", href);
        setPathname(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const page = useMemo(() => {
    if (pathname === "/why") return <WhyPage />;
    if (pathname === "/by-18") return <By18Page />;
    if (pathname === "/floor") return <FloorPage />;
    if (pathname === "/qa") return <QAPage />;
    if (pathname === "/domains") return <DomainsPage />;
    if (pathname.startsWith("/domains/")) {
      return <DomainDetailPage slug={pathname.replace("/domains/", "")} />;
    }
    return <HomePage />;
  }, [pathname]);

  return (
    <>
      {page}
    </>
  );
}
