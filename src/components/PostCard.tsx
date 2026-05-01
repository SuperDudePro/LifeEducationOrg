import { formatPostDate, getPostHref, getPostImage } from "../content/loadPosts";
import type { LifeEducationPost } from "../content/postTypes";

type Props = {
  post: LifeEducationPost;
};

export function PostCard({ post }: Props) {
  const href = getPostHref(post);
  const image = getPostImage(post);

  return (
    <article className="post-card">
      <a className="post-card-media" href={href} aria-label={`Read ${post.title}`}>
        {image ? (
          <img className="post-card-image" src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="post-card-placeholder" aria-hidden="true">
            <span>LifeEducation</span>
          </div>
        )}
      </a>
      <div className="post-card-body">
        <div className="post-card-kicker">
          <span className="post-pill">{post.status ?? "Recent"}</span>
          <span>{formatPostDate(post)}</span>
        </div>
        {post.topic ? <div className="post-card-topic">{post.topic}</div> : null}
        <h2 className="post-card-title">
          <a href={href}>{post.title}</a>
        </h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        {post.tags?.length ? (
          <ul className="post-tags" aria-label="Post tags">
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="post-tag">{tag}</li>
            ))}
          </ul>
        ) : null}
        <a className="post-read-link" href={href}>Read post</a>
      </div>
    </article>
  );
}
