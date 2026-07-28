import { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { PageIntro } from "../components/PageIntro";
import { BackBar } from "../components/BackBar";
import { PostCard } from "../components/PostCard";
import { SubscribeForm } from "../components/SubscribeForm";
import { getRecentPosts } from "../content/loadPosts";

export function PostsPage() {
  const currentPosts = getRecentPosts();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [year, setYear] = useState("all");
  const topics = useMemo(() => [...new Set(currentPosts.map((post) => post.topic).filter(Boolean) as string[])].sort(), [currentPosts]);
  const years = useMemo(() => [...new Set(currentPosts.map((post) => post.publishedAt.slice(0, 4)))].sort((a, b) => b.localeCompare(a)), [currentPosts]);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = currentPosts.filter((post) => {
    const searchable = `${post.title} ${post.excerpt} ${post.topic ?? ""} ${(post.tags ?? []).join(" ")}`.toLowerCase();
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (topic === "all" || post.topic === topic) && (year === "all" || post.publishedAt.startsWith(year));
  });

  return (
    <PageShell>
      <PageIntro pill="Posts" title="Field Notes" subtitle="Search the published notebook by subject, topic, or year." />
      <BackBar><a href="/" className="back-link">← Back to Home</a></BackBar>
      <section className="doc-dark">
        <p className="doc-dark-text">This is the public notebook for LifeEducation: essays, objections, revisions, experiments, and real-world examples that sit beside the core framework.</p>
      </section>
      <SubscribeForm idPrefix="posts-page" />
      <section className="posts-section">
        <div className="posts-head">
          <div className="posts-pill">Search and archive</div>
          <h2 className="posts-title">{matches.length} published post{matches.length === 1 ? "" : "s"}</h2>
          <div className="post-hero-actions" style={{ flexWrap: "wrap", alignItems: "end" }}>
            <label><span className="posts-pill">Words</span><input aria-label="Search posts" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Capability, school, money…" /></label>
            <label><span className="posts-pill">Topic</span><select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option value="all">All topics</option>{topics.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label><span className="posts-pill">Year</span><select aria-label="Filter by year" value={year} onChange={(event) => setYear(event.target.value)}><option value="all">All years</option>{years.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
        </div>
        <div className="post-grid">{matches.map((post) => <PostCard key={post.slug} post={post} />)}</div>
      </section>
    </PageShell>
  );
}
