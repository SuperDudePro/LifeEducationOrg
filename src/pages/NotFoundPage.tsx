import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";

export function NotFoundPage() {
  return (
    <PageShell>
      <PageIntro
        pill="404"
        title="That page isn't here."
        subtitle="The link may be old, or the page may have moved. Everything still lives one click away."
      />
      <BackBar>
        <div className="back-link-row">
          <a href="/" className="back-link">← Back to Home</a>
          <a href="/domains" className="back-link">Browse the Domains</a>
          <a href="/posts" className="back-link">Read the Posts</a>
        </div>
      </BackBar>
    </PageShell>
  );
}
