type AskCtaProps = {
  variant?: "default" | "qa";
};

export function AskCta({ variant = "default" }: AskCtaProps) {
  const isQa = variant === "qa";

  return (
    <aside className="ask-cta" aria-labelledby={`ask-cta-title-${variant}`}>
      <div>
        <h2 id={`ask-cta-title-${variant}`}>
          {isQa ? "Didn't find what you were looking for?" : "Still thinking about it?"}
        </h2>
        <p>
          {isQa
            ? "Ask a question using the current LifeEducation framework."
            : "Ask LifeEducation a question about the framework. It will answer from the public material and show you where the answer came from."}
        </p>
      </div>
      <a className="ask-cta-link" href="/ask">
        {isQa ? "Ask a question" : "Ask LifeEducation"}
      </a>
    </aside>
  );
}
