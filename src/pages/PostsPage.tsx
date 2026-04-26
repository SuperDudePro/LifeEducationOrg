import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { PostCard } from "../components/PostCard";
import { getRecentPosts } from "../content/loadPosts";

export function PostsPage() {
  const currentPosts = getRecentPosts();

  return (
    <PageShell>
      <PageIntro
        pill="Posts"
        title="Field Notes"
        subtitle="Essays on raising capable kids, building LifeEducation in real life, and testing a different path toward adulthood."
      />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">
          This is the public notebook for LifeEducation: the place for essays, objections, revisions, experiments, and real-world examples that do not belong inside the core framework documents.
        </p>
        <p className="doc-dark-text">
          The focus stays narrow on purpose. Everything here returns to the same question: what does it take to raise capable, self-directed humans without confusing schooling, credentials, or paperwork with actual readiness for life?
        </p>
      </section>
      <section className="posts-section">
        <div className="posts-head">
          <div className="posts-pill">Latest writing</div>
          <h2 className="posts-title">Explorations from the LifeEducation build.</h2>
          <p className="posts-text">
            Posts here follow the project as it moves from documents into daily life: the Floor, the Domains, autonomy, evidence, travel, money, health, technology, and the practical work of building a childhood that points toward real adulthood.
          </p>
        </div>
        <div className="post-grid">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
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
