import { useEffect, useMemo, useState } from "react";

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
    "By 18 names the deadline, not the earliest possible finish.",
    "This is the point of the system: not what classes you sat through, but what you can actually do in real life.",
  ],
  groups: [
    {
      title: "Run Your Own Life",
      items: [
        "manage your time, obligations, logistics, and basic adult tasks",
        "show up in a new city or system and figure out how it works without panicking",
        "navigate institutions and bureaucracies",
        "advocate for yourself in real institutions",
        "learn what you need next without waiting for a formal class",
        "recover when things go wrong instead of collapsing at the first obstacle",
      ],
    },
    {
      title: "Communicate Clearly and Deal Well With People",
      items: [
        "read adult-level material and understand what it says",
        "write clearly for the audience you are writing to",
        "speak comfortably with strangers, authority figures, and groups",
        "listen well enough to represent someone else’s view fairly",
        "notice when language is being used to manipulate, pressure, or persuade you",
      ],
    },
    {
      title: "Think Clearly About the World",
      items: [
        "ask how do we know that and mean it",
        "test claims, observe outcomes, and update when reality disagrees",
        "interpret numbers, charts, percentages, and basic statistics",
        "do everyday mental math, estimate, and sanity-check numbers",
        "reason about risk, tradeoffs, and consequences",
      ],
    },
    {
      title: "Own Your Body and Health",
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

function SiteNav() {
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-link">Home</a>
        <a href="/why" className="site-nav-link">Why</a>
        <a href="/floor" className="site-nav-link">Floor</a>
        <a href="/by-18" className="site-nav-link">By 18</a>
        <a href="/domains" className="site-nav-link">Domains</a>
        <span className="site-nav-muted">Q&amp;A soon</span>
      </div>
    </nav>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
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

function BackBar({ children }: { children: React.ReactNode }) {
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
          <p className="faq-text">Better to answer them plainly than hide the big distinctions under branding.</p>
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
    if (pathname === "/domains") return <DomainsPage />;
    if (pathname.startsWith("/domains/")) {
      return <DomainDetailPage slug={pathname.replace("/domains/", "")} />;
    }
    return <HomePage />;
  }, [pathname]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body {
          background: #000;
          color: #111827;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        a { text-decoration: none; }
        .page { min-height: 100vh; background: #000; padding: 12px; }
        .shell { min-height: calc(100vh - 24px); border-radius: 32px; overflow: hidden; border: 1px solid rgba(255,255,255,0.10); background: linear-gradient(180deg, #f4f6f8 0%, #e3e8ed 100%); box-shadow: 0 35px 120px -50px rgba(0,0,0,0.7); }
        .header { background: #000; border-bottom: 1px solid rgba(255,255,255,0.10); padding: 20px 24px; text-align: center; }
        .brand { margin: 0; color: #fff; font-family: Georgia, "Times New Roman", serif; font-size: clamp(34px, 5.2vw, 60px); font-weight: 500; letter-spacing: 0.02em; line-height: 1; }
        .header a:hover .brand { opacity: 0.92; }
        .site-nav { background: #000; border-bottom: 1px solid rgba(255,255,255,0.10); padding: 14px 24px 16px; }
        .site-nav-inner { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .site-nav-link, .site-nav-muted { display: inline-flex; align-items: center; padding: 10px 14px; border-radius: 999px; font-size: 14px; font-weight: 600; line-height: 1; }
        .site-nav-link { border: 1px solid rgba(255,255,255,0.15); color: #fff; transition: background-color 0.2s ease; }
        .site-nav-link:hover { background: rgba(255,255,255,0.10); }
        .site-nav-muted { border: 1px solid rgba(255,255,255,0.10); color: #94a3b8; }
        .hero { display: grid; grid-template-columns: 0.88fr 1.12fr; gap: 0; }
        .hero-copy, .hero-art { display: flex; align-items: center; }
        .hero-copy { padding: 32px 40px 36px 44px; justify-content: center; }
        .copy-inner { width: 100%; max-width: 720px; }
        .pill, .why-pill, .faq-pill, .floor-pill, .domains-pill, .contact-pill, .doc-pill { display: inline-flex; align-items: center; padding: 10px 16px; border-radius: 999px; border: 6px solid #2A8A67; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .pill, .faq-pill, .domains-pill { background: rgba(255,255,255,0.6); color: #2A8A67; }
        .why-pill, .floor-pill { background: rgba(255,255,255,0.05); color: #2A8A67; }
        .contact-pill, .doc-pill { background: #f8fafc; color: #2A8A67; }
        .hero-title { margin: 24px 0 0; color: #0f172a; font-family: Georgia, "Times New Roman", serif; font-size: clamp(34px, 4.8vw, 66px); line-height: 0.98; font-weight: 500; }
        .hero-text { margin: 24px 0 0; max-width: 620px; color: #334155; font-size: clamp(18px, 1.5vw, 22px); line-height: 1.75; }
        .hero-art { justify-content: center; padding: 0 28px 36px 12px; }
        .art-card { position: relative; width: 100%; min-height: 560px; display: flex; align-items: center; justify-content: center; padding: 32px; border-radius: 28px; border: 1px solid rgba(148,163,184,0.55); background: linear-gradient(180deg, #fafbfd 0%, #e9eef3 100%); box-shadow: inset 0 2px 20px rgba(15,23,42,0.06); overflow: hidden; }
        .art-card::before { content: ""; position: absolute; width: 54%; max-width: 430px; aspect-ratio: 1 / 1; border-radius: 999px; background: radial-gradient(circle, rgba(112,255,178,0.18) 0%, rgba(55,214,132,0.11) 30%, rgba(13,75,57,0.0) 72%); filter: blur(34px); opacity: 0.95; pointer-events: none; }
        .tree-wrap { position: relative; z-index: 1; width: 100%; display: flex; justify-content: center; align-items: center; }
        .tree-wrap img { width: 78%; max-width: 520px; height: auto; display: block; margin: 0 auto; filter: brightness(1.08) saturate(1.18) contrast(1.04) drop-shadow(0 0 10px rgba(96,255,170,0.10)) drop-shadow(0 0 28px rgba(42,138,103,0.12)); }
        .image-break { background: #050608; padding: 18px 18px 10px; }
        .image-break-inner { width: 100%; max-width: 1600px; margin: 0 auto; }
        .image-break-img { width: 100%; display: block; height: auto; }
        .why { background: #101114; color: #fff; padding: 48px 56px 56px; }
        .why-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: start; }
        .why-copy { width: 100%; max-width: 820px; }
        .why-title, .floor-title, .domains-title, .faq-title, .contact-title, .doc-title, .domain-page-card-title, .doc-section-title { font-family: Georgia, "Times New Roman", serif; }
        .why-title { margin: 24px 0 0; color: #fff; font-size: clamp(28px, 3.8vw, 48px); line-height: 1.02; font-weight: 500; }
        .why-text { margin: 20px 0 0; max-width: 720px; color: #cbd5e1; font-size: 18px; line-height: 1.75; }
        .why-button, .domains-button { display: inline-flex; align-items: center; margin-top: 32px; padding: 14px 20px; border-radius: 999px; border: 6px solid #2A8A67; background: #fff; color: #0D4B39; font-size: 15px; font-weight: 600; transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; }
        .why-button:hover, .domains-button:hover { background: #dcefe7; color: #0D4B39; box-shadow: 0 12px 28px -16px rgba(42,138,103,0.45); transform: translateY(-1px); }
        .why-cards { display: grid; gap: 16px; width: 100%; }
        .why-card { border-radius: 24px; border: 1px solid rgba(15,23,42,0.08); background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); padding: 24px; }
        .why-card-label, .faq-card-label, .floor-card-label, .contact-card-label { color: #2A8A67; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .why-card-title { margin-top: 12px; color: #0f172a; font-size: 32px; line-height: 1.1; font-weight: 500; }
        .why-card-text { margin-top: 12px; color: #334155; font-size: 15px; line-height: 1.8; }
        .faq { background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); color: #0f172a; padding: 48px 56px 56px; }
        .faq-title { margin: 24px 0 0; color: #0D4B39; font-size: clamp(26px, 3vw, 40px); line-height: 1.04; font-weight: 800; width: 100%; }
        .faq-text { margin: 18px 0 0; max-width: 820px; color: #334155; font-size: 18px; line-height: 1.75; }
        .faq-grid, .floor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }
        .faq-card, .contact-card { border-radius: 26px; background: #050608; color: #fff; padding: 28px; box-shadow: 0 24px 60px -40px rgba(0,0,0,0.6); }
        .faq-card-title { margin-top: 14px; color: #fff; font-size: 28px; line-height: 1.12; font-weight: 500; }
        .faq-card-text { margin-top: 16px; color: #cbd5e1; font-size: 16px; line-height: 1.8; }
        .floor-section { background: #0b0c0f; color: #fff; padding: 48px 56px 56px; border-top: 1px solid rgba(255,255,255,0.08); }
        .floor-head { max-width: 980px; }
        .floor-title { margin: 24px 0 0; color: #fff; font-size: clamp(28px, 3.6vw, 46px); line-height: 1.04; font-weight: 500; }
        .floor-text { margin: 18px 0 0; max-width: 860px; color: #cbd5e1; font-size: 18px; line-height: 1.75; }
        .floor-card { border-radius: 26px; border: 1px solid rgba(15,23,42,0.08); background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); color: #0f172a; padding: 28px; }
        .floor-card-title { margin-top: 14px; color: #0f172a; font-size: 28px; line-height: 1.12; font-weight: 500; }
        .floor-card-text { margin-top: 16px; color: #334155; font-size: 16px; line-height: 1.8; }
        .floor-card-button, .contact-card-cta { display: inline-flex; align-items: center; margin-top: 24px; padding: 12px 18px; border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none; transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; }
        .floor-card-button { border: 1px solid rgba(15,23,42,0.12); background: #0f172a; color: #fff; }
        .floor-card-button:hover { background: #1f8a67; border-color: #1f8a67; color: #fff; box-shadow: 0 12px 28px -16px rgba(31,138,103,0.75); transform: translateY(-1px); }
        .floor-card-accent { border: 6px solid #2A8A67; }
        .floor-card-accent .floor-card-title { color: #146C4E; }
        .floor-card-button-accent { border: 6px solid #2A8A67; }
        .domains { background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); color: #0f172a; padding: 48px 56px 56px; border-top: 1px solid rgba(15,23,42,0.08); }
        .domains-head { max-width: 980px; }
        .domains-title { margin: 24px 0 0; color: #0D4B39; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.04; font-weight: 700; }
        .domains-text { margin: 18px 0 0; max-width: 860px; color: #334155; font-size: 18px; line-height: 1.75; }
        .domains-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; margin-top: 30px; }
        .domains-item { border-radius: 22px; border: 1px solid rgba(255,255,255,0.08); background: #050608; padding: 18px 20px; color: #fff; font-size: 17px; line-height: 1.45; font-weight: 600; box-shadow: 0 18px 40px -38px rgba(0,0,0,0.45); }
        .domains-item-link { display: flex; align-items: center; gap: 12px; transition: background-color 0.2s ease, transform 0.15s ease; }
        .domains-item-link:hover { background: #111318; transform: translateY(-1px); }
        .domains-item-number { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 999px; border: 2px solid #2A8A67; color: #cbd5e1; font-size: 13px; font-weight: 700; flex-shrink: 0; }
        .domains-note { margin-top: 26px; color: #475569; font-size: 15px; line-height: 1.8; }
        .contact { background: #ffffff; color: #0f172a; padding: 52px 56px 64px; border-top: 1px solid rgba(15,23,42,0.08); }
        .contact-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); gap: 24px; align-items: start; }
        .contact-title { margin: 24px 0 0; color: #0D4B39; font-size: clamp(24px, 2.8vw, 38px); line-height: 1.04; font-weight: 700; }
        .contact-text { margin: 18px 0 0; max-width: 760px; color: #334155; font-size: 18px; line-height: 1.75; }
        .contact-copy { max-width: 760px; }
        .contact-card-line { margin-top: 14px; color: #fff; font-family: Georgia, "Times New Roman", serif; font-size: 28px; line-height: 1.2; font-weight: 500; overflow-wrap: anywhere; word-break: break-word; }
        .contact-card-line a { color: #fff; text-decoration: none; overflow-wrap: anywhere; word-break: break-word; }
        .contact-card-line a:hover { text-decoration: underline; }
        .contact-card-note { margin-top: 14px; color: #cbd5e1; font-size: 15px; line-height: 1.8; }
        .contact-card-cta { border: 6px solid #2A8A67; color: #fff; }
        .contact-card-cta:hover { background: #2A8A67; border-color: #2A8A67; color: #fff; box-shadow: 0 12px 28px -16px rgba(42,138,103,0.8); transform: translateY(-1px); }
        .doc-hero { background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); padding: 42px 56px 48px; border-top: 1px solid rgba(15,23,42,0.08); }
        .doc-title { margin: 24px 0 0; color: #0D4B39; font-size: clamp(30px, 4.2vw, 54px); line-height: 1.04; font-weight: 700; }
        .doc-subtitle { margin: 14px 0 0; color: #475569; font-size: 18px; line-height: 1.75; }
        .doc-notice { margin-top: 20px; max-width: 900px; padding: 18px 20px; border-radius: 22px; border: 1px solid #f5c16c; background: #fff4da; color: #7c4a03; font-size: 16px; line-height: 1.7; }
        .back-bar { background: #fff; border-top: 1px solid rgba(15,23,42,0.08); border-bottom: 1px solid rgba(15,23,42,0.08); padding: 18px 56px; }
        .back-link-row { display: flex; flex-wrap: wrap; gap: 18px; }
        .back-link { color: #0D4B39; font-size: 14px; font-weight: 700; }
        .back-link:hover { text-decoration: underline; }
        .doc-dark { background: #0b0c0f; padding: 40px 56px 44px; }
        .doc-dark-text { margin: 0; max-width: 960px; color: #e2e8f0; font-size: 20px; line-height: 1.8; }
        .doc-dark-text + .doc-dark-text { margin-top: 18px; }
        .doc-section { background: #fff; border-top: 1px solid rgba(15,23,42,0.08); padding: 40px 56px 46px; }
        .doc-section-alt { background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%); }
        .doc-section-title { margin: 0; color: #0D4B39; font-size: clamp(28px, 3vw, 42px); line-height: 1.1; font-weight: 700; }
        .doc-section-text { margin: 18px 0 0; max-width: 980px; color: #334155; font-size: 18px; line-height: 1.85; }
        .doc-list { margin: 20px 0 0; padding: 0; list-style: none; max-width: 980px; display: grid; gap: 14px; }
        .doc-list-item { display: flex; gap: 12px; color: #334155; font-size: 18px; line-height: 1.8; }
        .doc-list-dot { width: 10px; height: 10px; border-radius: 999px; background: #2A8A67; margin-top: 12px; flex-shrink: 0; }
        .domain-page-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 22px; margin-top: 28px; }
        .domain-page-card { display: block; border-radius: 24px; background: #050608; color: #fff; padding: 22px 22px 20px; box-shadow: 0 20px 45px -36px rgba(0,0,0,0.55); transition: background-color 0.2s ease, transform 0.15s ease; }
        .domain-page-card:hover { background: #111318; transform: translateY(-1px); }
        .domain-page-card-number { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 999px; border: 2px solid #2A8A67; color: #cbd5e1; font-size: 13px; font-weight: 700; }
        .domain-page-card-title { margin-top: 14px; font-size: 28px; line-height: 1.12; font-weight: 500; }
        .domain-page-card-note { margin-top: 10px; color: #cbd5e1; font-size: 14px; line-height: 1.6; }
        .footer { background: #000; color: #cbd5e1; padding: 24px 56px 28px; border-top: 1px solid rgba(255,255,255,0.08); }
        .footer-inner { display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
        .footer-text, .footer-link { font-size: 14px; line-height: 1.7; }
        .footer-link { color: #cbd5e1; text-decoration: none; }
        .footer-link:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 900px) {
          .hero, .why-grid, .faq-grid, .floor-grid, .contact-grid, .domain-page-grid { grid-template-columns: 1fr; }
          .hero-copy { padding: 40px 32px 24px; }
          .hero-art { padding: 0 32px 40px; }
          .art-card { min-height: 0; }
          .site-nav { padding: 12px 20px 14px; }
          .why, .faq, .floor-section, .domains, .contact, .doc-hero, .doc-dark, .doc-section { padding-left: 32px; padding-right: 32px; }
          .back-bar, .footer { padding-left: 32px; padding-right: 32px; }
          .domains-grid { grid-template-columns: 1fr; }
          .image-break { padding: 12px 12px 6px; }
        }
        @media (max-width: 640px) {
          .page { padding: 8px; }
          .shell { min-height: calc(100vh - 16px); border-radius: 24px; }
          .header { padding: 20px 16px; }
          .site-nav { padding: 10px 12px 12px; }
          .site-nav-inner { gap: 8px; }
          .site-nav-link, .site-nav-muted { padding: 9px 12px; font-size: 13px; }
          .hero-copy { padding: 28px 20px 20px; }
          .hero-art { padding: 0 20px 28px; }
          .art-card { padding: 20px; border-radius: 22px; }
          .why, .faq, .floor-section, .domains, .contact, .doc-hero, .doc-dark, .doc-section { padding-left: 20px; padding-right: 20px; }
          .back-bar, .footer { padding-left: 20px; padding-right: 20px; }
          .image-break { padding: 8px 8px 4px; }
          .why-card-title, .faq-card-title, .floor-card-title, .contact-card-line, .domain-page-card-title { font-size: 24px; }
          .doc-title { font-size: 30px; }
          .doc-section-title { font-size: 28px; }
          .doc-dark-text, .doc-section-text, .doc-list-item { font-size: 17px; }
        }
      `}</style>
      {page}
    </>
  );
}
