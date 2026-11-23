/**
 * Homepage-only navigation: editorial questions lead directly to existing
 * published framework pages and essays. No scoring or visitor data collection.
 */
const journeys = [
  {
    question: "What should a young adult be able to do by 18?",
    context: "Start with the practical picture, then see the formal minimum.",
    links: [
      { label: "Start with By 18", href: "/by-18" },
      { label: "Read the Floor", href: "/floor" },
    ],
  },
  {
    question: "Could they manage everyday life on their own?",
    context: "Explore planning, follow-through, and handling unfamiliar situations.",
    links: [
      { label: "Life Skills domain", href: "/domains/life-skills-project-execution" },
      { label: "Read: Can You Run Your Own Life?", href: "/posts/domain-10-life-skills-project-execution" },
    ],
  },
  {
    question: "Can they make sense of money and agreements?",
    context: "Look at everyday financial decisions, contracts, and trade-offs.",
    links: [
      { label: "Economics & Finance domain", href: "/domains/economics-finance" },
      { label: "Read: What Are You Really Agreeing To?", href: "/posts/domain-6-economics-finance" },
    ],
  },
  {
    question: "Can they judge what they see online?",
    context: "Find the existing material on technology, media, AI, and privacy.",
    links: [
      { label: "Technology & Media domain", href: "/domains/technology-media-ai-literacy" },
      { label: "Read: Being Good With Your Phone Isn't Enough", href: "/posts/domain-9-technology-media-ai-literacy" },
    ],
  },
  {
    question: "How do we tell whether learning is real?",
    context: "Read the framework's distinction between apparent performance and demonstrated capability.",
    links: [
      { label: "Why LifeEducation exists", href: "/why" },
      { label: "Read: Show Me the Three", href: "/posts/show-me-the-three" },
    ],
  },
] as const;

export function GuidedExplorer() {
  return (
    <section className="guided-explorer" aria-labelledby="guided-explorer-title">
      <div className="guided-explorer-header">
        <span className="guided-explorer-pill">Find your starting point</span>
        <h2 id="guided-explorer-title">What question brought you here?</h2>
        <p>Choose a real-life question. Each path leads to existing LifeEducation pages and essays — not a test or a judgment about a child.</p>
      </div>
      <div className="guided-explorer-grid">
        {journeys.map((journey) => (
          <article className="guided-explorer-card" key={journey.question}>
            <h3>{journey.question}</h3>
            <p>{journey.context}</p>
            <div className="guided-explorer-links">
              {journey.links.map((link) => (
                <a key={link.href} href={link.href}>{link.label}<span aria-hidden="true"> →</span></a>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="guided-explorer-more">Prefer the full map? <a href="/domains">Browse all ten Domains</a>.</p>
    </section>
  );
}
