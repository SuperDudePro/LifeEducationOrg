import { useEffect, useState } from "react";
import { PageShell } from "../components/PageShell";
import { BackBar } from "../components/BackBar";
import { AskCta } from "../components/AskCta";
import { PostCard } from "../components/PostCard";
import { SharePost } from "../components/SharePost";
import { formatPostDate, getRelatedPosts, loadPostBySlug } from "../content/loadPosts";
import type { LifeEducationPost } from "../content/postTypes";

type Props = { slug: string };
type PostLoadState = { slug: string; post: LifeEducationPost | null | undefined };

export function PostPage({ slug }: Props) {
  const [loadState, setLoadState] = useState<PostLoadState>({ slug, post: undefined });
  useEffect(() => {
    let isActive = true;
    loadPostBySlug(slug).then((loadedPost) => { if (isActive) setLoadState({ slug, post: loadedPost ?? null }); }).catch(() => { if (isActive) setLoadState({ slug, post: null }); });
    return () => { isActive = false; };
  }, [slug]);

  const post = loadState.slug === slug ? loadState.post : undefined;
  if (post === undefined) return <PageShell><section className="doc-hero"><div className="doc-pill">Loading post</div><h1 className="doc-title">Loading the field note.</h1></section></PageShell>;
  if (!post) return <PageShell><section className="doc-hero"><div className="doc-pill">Post not found</div><h1 className="doc-title">That post is not here.</h1><p className="doc-subtitle">The link may be old, or the post may have moved.</p></section><BackBar><a href="/posts" className="back-link">← Back to Posts</a></BackBar></PageShell>;

  const related = getRelatedPosts(post);
  const shareUrl = `https://www.lifeeducation.org/posts/${post.slug}`;
  const shareImageSource = post.cardImage ?? post.heroImage;
  const shareImage = shareImageSource ? new URL(shareImageSource, "https://www.lifeeducation.org").href : undefined;

  return (
    <PageShell>
      <article>
        <section className="post-hero">
          <div className="post-hero-copy">
            <div className="doc-pill">{post.topic ?? "Post"}</div>
            <h1 className="doc-title">{post.title}</h1>
            <p className="doc-subtitle">{post.excerpt}</p>
            <p className="post-page-meta">{formatPostDate(post)}</p>
            <div className="post-hero-actions"><a className="why-button" href="/posts">Search all posts</a></div>
          </div>
          {post.heroImage ? <div className="post-hero-media"><img src={post.heroImage} alt={post.heroAlt ?? ""} loading="eager" decoding="async" /></div> : null}
        </section>
        <BackBar><a href="/posts" className="back-link">← Back to Posts</a></BackBar>
        <section className="post-article">
          {post.body}
          <AskCta />
          <SharePost title={post.title} excerpt={post.excerpt} url={shareUrl} image={shareImage} />
        </section>
      </article>
      {related.length > 0 && <section className="posts-section" aria-labelledby="related-posts-title"><div className="posts-head"><div className="posts-pill">Keep reading</div><h2 className="posts-title" id="related-posts-title">Related field notes</h2></div><div className="post-grid">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div></section>}
    </PageShell>
  );
}
