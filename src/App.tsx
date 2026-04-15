import React, { useEffect, useMemo, useState } from "react";

type Domain = {
  slug: string;
  title: string;
  emoji: string;
  coreOutcomes: string[];
  competencies: string[];
  evidence: string;
};

const WHY_DATA = {
  title: "Why LifeEducation.org Exists",
  subtitle: "Main public overview",
  intro: [
    "Most education talk starts in the wrong place.",
    "It starts with school. Or curriculum. Or standards. Or credentials.",
    "The better starting point is simpler: what should an 18-year-old actually be able to do?",
  ],
  sections: [
    {
      heading: "🎯 The Standard",
      body: [
        "Not what classes they sat through. Not what boxes got checked. Not what looked good on paper. What can they actually do, on their own, in real life?",
        "That is the standard.",
      ],
    },
    {
      heading: "🧭 What LifeEducation Is",
      body: [
        "LifeEducation is a lightweight operating system for raising capable, self-directed humans.",
        "The environment can change. The operating system stays.",
        "The goal is real capability, autonomy, and judgment.",
      ],
    },
    {
      heading: "🧱 The Six Priorities",
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
      heading: "✅ What Floor-Complete Means",
      body: [
        "A floor-complete 18-year-old is not perfect. They are a young adult who can function.",
        "If you dropped them into a new city at 18, they would not panic. They would ask good questions, handle money, solve problems, and keep moving.",
        "The Floor is the contract. It defines the non-negotiable minimum capability expected by age 18.",
      ],
    },
    {
      heading: "🏠 What This Looks Like in Practice",
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

const BY18_DATA = {
  title: "By 18: What You Can Do",
  subtitle: "Public translation of the Floor contract",
  intro: [
    "By 18 names the deadline, not the earliest possible finish.",
    "This is the point of the system: not what classes you sat through, but what you can actually do in real life.",
  ],
  groups: [
    {
      title: "🏃 Run Your Own Life",
      items: [
        "manage your time, obligations, logistics, and basic adult tasks",
        "show up in a new city or system and figure out how it works without panicking",
        "advocate for yourself in real institutions",
        "learn what you need next without waiting for a formal class",
      ],
    },
    {
      title: "🗣️ Communicate Clearly and Deal Well With People",
      items: [
        "read adult-level material and understand what it says",
        "write clearly for the audience you are writing to",
        "speak comfortably with strangers, authority figures, and groups",
        "listen well enough to represent someone else’s view fairly",
      ],
    },
    {
      title: "🧠 Think Clearly About the World",
      items: [
        "ask how do we know that and mean it",
        "test claims, observe outcomes, and update when reality disagrees",
        "interpret numbers, charts, percentages, and basic statistics",
        "reason about risk, tradeoffs, and consequences",
      ],
    },
    {
      title: "💪 Own Your Body and Health",
      items: [
        "take responsibility for sleep, hygiene, movement, and nutrition",
        "cook real meals and feed yourself reasonably well",
        "handle basic first aid and emergency response",
        "manage stress with coping tools that actually work",
      ],
    },
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
      heading: "📌 What the Floor Is",
      body: [
        "The Floor is not a curriculum.",
        "It does not dictate how learning happens.",
        "It defines the capability that must exist before the Floor is honestly met.",
      ],
    },
    {
      heading: "🗺️ The Floor Lives Inside the Domains",
      body: [
        "The Floor is expressed through the LifeEducation domains.",
        "Domains exist to ensure that important parts of life are not neglected. The Floor defines the minimum contract inside those domains.",
      ],
    },
    {
      heading: "⚖️ Floor Principles",
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
    emoji: "🗣️",
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
    emoji: "🔢",
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
    emoji: "🧪",
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
    emoji: "🏛️",
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
    emoji: "🧭",
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
    emoji: "💸",
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
    emoji: "💪",
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
    emoji: "🎨",
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
    emoji: "💻",
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
    emoji: "🛠️",
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
      "Kids who can run their own lives. School is not the point. The point is a young adult who can think, adapt, solve problems, and function in real life.",
  },
  {
    label: "Plain English",
    question: "What does floor-complete mean?",
    answer:
      "It means the kid can function in the real world. If you dropped them into a new city at 18, they would not panic.",
  },
  {
    label: "Common Objection",
    question: "Is this just unschooling with a nicer name?",
    answer:
      "No. The Floor is a real contract. The Domains are a real coverage map.",
  },
  {
    label: "How It Fits",
    question: "How do the Why, Floor, By 18, and Domains fit together?",
    answer:
      "The Why says what this is for. The Floor sets the minimum by 18. By 18 puts that in plain English. The Domains keep the broader map in view.",
  },
] as const;

function BrandHeader() {
  return (
    <header className="bg-black px-6 py-5 text-center">
      <a href="/" className="inline-block">
        <h1 className="font-serif text-4xl text-white md:text-5xl">LifeEducation.org</h1>
      </a>
    </header>
  );
}

function SiteNav() {
  const linkClass =
    "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10";

  return (
    <nav className="border-b border-white/10 bg-black px-6 py-4 md:px-14">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <a href="/" className={linkClass}>Home</a>
        <a href="/why" className={linkClass}>Why</a>
        <a href="/floor" className={linkClass}>Floor</a>
        <a href="/by-18" className={linkClass}>By 18</a>
        <a href="/domains" className={linkClass}>Domains</a>
        <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-400">
          Q&A soon
        </span>
      </div>
    </nav>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black p-3 md:p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-100 to-slate-200 shadow-2xl">
        <BrandHeader />
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
    <section className="border-b border-slate-300 bg-slate-100 px-6 py-10 md:px-14 md:py-12">
      <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
        {pill}
      </div>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-slate-900 md:text-6xl">{title}</h1>
      {subtitle ? <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p> : null}
      {notice ? (
        <div className="mt-6 max-w-4xl rounded-[22px] border border-amber-300 bg-amber-50 px-5 py-4 text-base leading-8 text-amber-900">
          {notice}
        </div>
      ) : null}
    </section>
  );
}

function BackBar({ children }: { children: React.ReactNode }) {
  return <section className="border-b border-slate-300 bg-white px-6 py-5 md:px-14">{children}</section>;
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
    <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
      <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">{heading}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
          {paragraph}
        </p>
      ))}
      {bullets?.length ? (
        <ul className="mt-5 max-w-4xl space-y-3 text-lg leading-8 text-slate-700">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {footer ? <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{footer}</p> : null}
    </section>
  );
}

function HomePage() {
  return (
    <PageShell>
      <section className="grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr]">
        <div className="flex items-center px-6 py-8 md:px-11 md:py-10">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
              LifeEducation
            </div>
            <h2 className="mt-6 font-serif text-4xl leading-none text-slate-900 md:text-6xl">
              If you dropped them off in a strange city on a different continent, could they figure it out?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-[22px]">
              Too much of the current system still rewards looking good on paper. I’m trying to raise kids who can think, adapt, solve problems, and function in real life.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center px-5 pb-8 md:px-7 md:pb-10">
          <div className="flex min-h-[380px] w-full items-center justify-center rounded-[28px] border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 p-8">
            <img
              src="/lifeeducation_tree_source.webp"
              alt=""
              aria-hidden="true"
              className="block h-auto w-[78%] max-w-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-4 md:px-5 md:py-5">
        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          <img
            className="block h-auto w-full"
            src="/lifeeducation_break_navigator.webp"
            alt="Young person navigating a foreign city with a map"
          />
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-12 text-white md:px-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-500">
              The Why
            </div>
            <h3 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
              Most education talk starts in the wrong place.
            </h3>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              It starts with school. Or curriculum. Or standards. Or credentials. The better starting point is simpler: what should an 18-year-old actually be able to do, on their own, in real life?
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Skip the school reform debate. Name a better target and build around it directly. The goal is real capability, autonomy, and judgment.
            </p>
            <a className="mt-8 inline-flex rounded-full border-[6px] border-emerald-700 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-slate-100" href="/why">
              Read the Why Statement
            </a>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Target</div>
              <div className="mt-3 font-serif text-2xl leading-tight">The Floor is the contract.</div>
              <div className="mt-3 text-base leading-8 text-slate-700">
                Minimum adulthood capability by 18. Serious, non-negotiable, and not disguised curriculum theater.
              </div>
            </div>
            <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Priorities</div>
              <div className="mt-3 font-serif text-2xl leading-tight">Agency. Capability. Optionality.</div>
              <div className="mt-3 text-base leading-8 text-slate-700">
                Integrity, Health, and Belonging complete the set. The system exists to serve those six priorities.
              </div>
            </div>
            <div className="rounded-[24px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 text-slate-900">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Shape</div>
              <div className="mt-3 font-serif text-2xl leading-tight">Keep it light.</div>
              <div className="mt-3 text-base leading-8 text-slate-700">
                A better target, clear guardrails, and a life where real things happen on purpose. That’s it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-200 px-6 py-12 md:px-14">
        <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
          Q&amp;A
        </div>
        <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
          The questions a serious parent or skeptic should ask.
        </h3>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Better to answer them plainly than hide the big distinctions under branding.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOME_FAQ_ITEMS.map((item) => (
            <div key={item.question} className="rounded-[26px] bg-black p-7 text-white shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-600">{item.label}</div>
              <div className="mt-3 font-serif text-2xl leading-tight">{item.question}</div>
              <div className="mt-4 text-base leading-8 text-slate-300">{item.answer}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-300 bg-black px-6 py-12 text-white md:px-14">
        <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-500">
          The Floor + By 18
        </div>
        <h3 className="mt-6 font-serif text-3xl leading-tight md:text-5xl">
          The contract, and By 18, its public translation.
        </h3>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
          The Floor is the non-negotiable minimum by 18. By 18 says the same thing in plain language.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[26px] bg-gradient-to-b from-slate-100 to-slate-200 p-7 text-slate-900 shadow-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">The contract</div>
            <div className="mt-3 font-serif text-2xl leading-tight">The 18-Year-Old Floor</div>
            <div className="mt-4 text-base leading-8 text-slate-700">
              This is the minimum line for adulthood capability.
            </div>
            <a className="mt-6 inline-flex rounded-full border border-slate-300 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="/floor">
              Read the Floor document
            </a>
          </div>

          <div className="rounded-[26px] border-[6px] border-emerald-700 bg-gradient-to-b from-slate-100 to-slate-200 p-7 text-slate-900 shadow-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">Public translation</div>
            <div className="mt-3 font-serif text-2xl leading-tight text-emerald-800">By 18: What You Can Do</div>
            <div className="mt-4 text-base leading-8 text-slate-700">
              This is the same contract in plain public language.
            </div>
            <a className="mt-6 inline-flex rounded-full border-[6px] border-emerald-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" href="/by-18">
              Read the By 18 document
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-300 bg-slate-200 px-6 py-12 md:px-14">
        <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
          The 10 Domains
        </div>
        <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
          The Floor is the minimum.
          <br />
          The Domains show the full map.
        </h3>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
          The Domains are here to keep blind spots visible.
        </p>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
          They are not a second contract. The Floor is still the minimum.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DOMAINS.map((domain) => (
            <a
              key={domain.slug}
              href={`/domains/${domain.slug}`}
              className="rounded-[22px] bg-black px-5 py-4 text-lg font-semibold leading-7 text-white shadow-lg transition hover:bg-zinc-900"
            >
              {domain.title}
            </a>
          ))}
        </div>

        <div className="mt-6 text-sm leading-7 text-slate-600">Contract first. Full map second.</div>
        <a className="mt-7 inline-flex rounded-full border-[6px] border-emerald-700 bg-white px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-slate-100" href="/domains">
          Read the Domains document
        </a>
      </section>

      <section className="bg-black px-4 py-4 md:px-5 md:py-5">
        <div className="mx-auto w-full max-w-7xl overflow-hidden">
          <img
            className="block h-auto w-full"
            src="/site_break_02_contact_desk.webp"
            alt="Documents, notes, and letters prepared for serious public exchange"
          />
        </div>
      </section>

      <section className="border-t border-slate-300 bg-white px-6 py-12 md:px-14 md:py-14">
        <div className="inline-flex rounded-full border-[6px] border-emerald-700 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
          Contact
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="max-w-3xl min-w-0">
            <h3 className="font-serif text-3xl font-bold leading-tight text-emerald-900 md:text-5xl">
              If you see something I’m missing, tell me.
            </h3>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              I’m building this for my own kids first. If you see a blind spot, a hole in the logic, or a better way to say something, send it.
            </p>
          </div>
          <div className="w-full min-w-0 rounded-[26px] bg-black p-7 text-white shadow-xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-600">Public contact</div>
            <div className="mt-3 font-serif text-2xl leading-tight break-words [overflow-wrap:anywhere]">
              <a href="mailto:LifeEducationInformation@gmail.com" className="break-words [overflow-wrap:anywhere]">
                LifeEducationInformation@gmail.com
              </a>
            </div>
            <div className="mt-4 text-base leading-8 text-slate-300">
              Use this address for objections, ideas, examples, or serious feedback.
            </div>
            <a className="mt-6 inline-flex rounded-full border-[6px] border-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10" href="mailto:LifeEducationInformation@gmail.com?subject=LifeEducation%20Website%20Feedback">
              Email your thoughts
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-300 bg-black px-6 py-8 text-slate-300 md:px-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm leading-7">© LifeEducation.org</div>
          <div className="text-sm leading-7">
            <a className="hover:text-white" href="mailto:LifeEducationInformation@gmail.com">
              LifeEducationInformation@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </PageShell>
  );
}

function WhyPage() {
  return (
    <PageShell>
      <PageIntro pill="The Why" title={WHY_DATA.title} subtitle={WHY_DATA.subtitle} />
      <BackBar>
        <a href="/" className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-900">
          ← Back to Home
        </a>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {WHY_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {WHY_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
    </PageShell>
  );
}

function By18Page() {
  return (
    <PageShell>
      <PageIntro pill="By 18" title={BY18_DATA.title} subtitle={BY18_DATA.subtitle} />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/" className="transition hover:text-emerald-900">← Back to Home</a>
          <a href="/floor" className="transition hover:text-emerald-900">View the Floor</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {BY18_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {BY18_DATA.groups.map((group) => (
        <section key={group.title} className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
          <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">{group.title}</h2>
          <ul className="mt-6 max-w-5xl space-y-3 text-lg leading-8 text-slate-700">
            {group.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}

function FloorPage() {
  return (
    <PageShell>
      <PageIntro pill="The Floor" title={FLOOR_DATA.title} subtitle={FLOOR_DATA.subtitle} notice={FLOOR_DATA.notice} />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/" className="transition hover:text-emerald-900">← Back to Home</a>
          <a href="/by-18" className="transition hover:text-emerald-900">View By 18</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        {FLOOR_DATA.intro.map((paragraph) => (
          <p key={paragraph} className="max-w-4xl text-xl leading-9 text-slate-200 [&+p]:mt-5">
            {paragraph}
          </p>
        ))}
      </section>
      {FLOOR_DATA.sections.map((section) => (
        <RichSection key={section.heading} {...section} />
      ))}
    </PageShell>
  );
}

function DomainsPage() {
  return (
    <PageShell>
      <PageIntro pill="The Domains" title="10-Domain Learning Outcomes Framework" subtitle="Broader map, not a second contract" />
      <BackBar>
        <a href="/" className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-900">
          ← Back to Home
        </a>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        <p className="max-w-5xl text-xl leading-9 text-slate-200">
          The Floor defines the non-negotiable minimum. The Domains describe the fuller landscape: core outcomes, key competencies, and evidence examples.
        </p>
        <p className="mt-5 max-w-5xl text-xl leading-9 text-slate-200">
          Not everything here is required. The Floor remains the final word on what is mandatory.
        </p>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">The 10 Core Learning Domains</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DOMAINS.map((domain) => (
            <a
              key={domain.slug}
              href={`/domains/${domain.slug}`}
              className="rounded-[24px] bg-black px-5 py-5 text-white shadow-lg transition hover:-translate-y-[1px] hover:bg-zinc-900"
            >
              <div className="text-2xl">{domain.emoji}</div>
              <div className="mt-3 font-serif text-2xl leading-tight">{domain.title}</div>
              <div className="mt-3 text-sm leading-7 text-slate-300">Open full domain details</div>
            </a>
          ))}
        </div>
      </section>
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
      <PageIntro pill="Domain Detail" title={`${domain.emoji} ${domain.title}`} subtitle="Broader map page, not the minimum contract." />
      <BackBar>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
          <a href="/domains" className="transition hover:text-emerald-900">← Back to Domains</a>
          <a href="/" className="transition hover:text-emerald-900">Back to Home</a>
        </div>
      </BackBar>
      <section className="bg-black px-6 py-10 text-white md:px-14 md:py-12">
        <p className="max-w-4xl text-xl leading-9 text-slate-200">
          This page shows the broader domain map: core outcomes, key competencies, and evidence examples. The Floor still defines the minimum contract.
        </p>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">✅ Core Outcomes</h2>
        <ul className="mt-6 max-w-4xl space-y-3 text-lg leading-8 text-slate-700">
          {domain.coreOutcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-slate-300 bg-slate-100 px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">🧠 Key Competencies</h2>
        <ul className="mt-6 max-w-5xl space-y-3 text-lg leading-8 text-slate-700">
          {domain.competencies.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-slate-300 bg-white px-6 py-10 md:px-14 md:py-12">
        <h2 className="font-serif text-3xl leading-tight text-emerald-900 md:text-4xl">🧪 Evidence Examples</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{domain.evidence}</p>
      </section>
    </PageShell>
  );
}

export default function App() {
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
    if (pathname === "/domains") return <DomainsPage />;
    if (pathname.startsWith("/domains/")) {
      return <DomainDetailPage slug={pathname.replace("/domains/", "")} />;
    }
    return <HomePage />;
  }, [pathname]);

  return page;
}
