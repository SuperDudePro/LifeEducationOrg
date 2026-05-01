type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export function PostFigure({ src, alt, caption }: Props) {
  return (
    <figure className="post-figure">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
