import { useEffect, useState } from "react";
import { PageShell } from "../components/PageShell";
import { BackBar } from "../components/BackBar";
import { formatPostDate, loadPostBySlug } from "../content/loadPosts";
import type { LifeEducationPost } from "../content/postTypes";

type Props = {
  slug: string;
};

type PostLoadState = {
  slug: string;
  post: LifeEducationPost | null | undefined;
};

export function PostPage({ slug }: Props) {
  const [loadState, setLoadState] = useState<PostLoadState>({ slug, post: undefined });

  useEffect(() => {
    let isActive = true;

    loadPostBySlug(slug)
      .then((loadedPost) => {
        if (isActive) {
          setLoadState({ slug, post: loadedPost ?? null });
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadState({ slug, post: null });
        }
      });

    return () => {
      isActive = false;
    };
  }, [slug]);

  const post = loadState.slug === slug ? loadState.post : undefined;

  if (post === undefined) {
    return (
      <PageShell>
        <section className="doc-hero">
          <div className="doc-pill">Loading post</div>
          <h1 className="doc-title">Loading the field note.</h1>
          <p className="doc-subtitle">One moment while the essay opens.</p>
        </section>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <section className="doc-hero">
          <div className="doc-pill">Post not found</div>
          <h1 className="doc-title">That post is not here.</h1>
          <p className="doc-subtitle">The link may be old, or the post may have moved.</p>
        </section>
        <BackBar><a href="/posts" className="back-link">← Back to Posts</a></BackBar>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article>
        <section className="post-hero">
          <div className="post-hero-copy">
            <div className="doc-pill">{post.topic ?? "Post"}</div>
            <h1 className="doc-title">{post.title}</h1>
            <p className="doc-subtitle">{post.excerpt}</p>
            <p className="post-page-meta">{formatPostDate(post)}</p>
            <div className="post-hero-actions">
              <a className="why-button" href="/posts">Browse all posts</a>
            </div>
          </div>
          {post.heroImage ? (
            <div className="post-hero-media">
              <img src={post.heroImage} alt={post.heroAlt ?? ""} loading="eager" decoding="async" />
            </div>
          ) : null}
        </section>
        <BackBar><a href="/posts" className="back-link">← Back to Posts</a></BackBar>
        <section className="post-article">
          {post.body}
        </section>
      </article>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-text">© LifeEducation.org</div>
          <a className="footer-link" href="/contact">Contact</a>
        </div>
      </footer>
    </PageShell>
  );
}
