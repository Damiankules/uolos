import type { CSSProperties } from "react";
import sizesMap from "@/data/images.json";

type Info = { w: number; h: number; widths: number[] };
const map = sizesMap as Record<string, Info>;

interface Props {
  /** Path to the .webp original, e.g. /images/projects/x.webp */
  src: string;
  alt: string;
  /** CSS `sizes` — how wide the image is shown on the page */
  sizes: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

const set = (src: string, ext: "webp" | "avif", info?: Info) => {
  const base = src.replace(/\.webp$/, "");
  if (!info) return `${base}.${ext}`;
  return [...info.widths.map((w) => `${base}-w${w}.${ext} ${w}w`), `${base}.${ext} ${info.w}w`].join(", ");
};

/**
 * Responsive image: AVIF first, WebP fallback, several widths so phones
 * download small files. Variants are produced in public/images (see README).
 */
export default function Picture({ src, alt, sizes, className, style, loading = "lazy", fetchPriority }: Props) {
  const info = map[src];
  return (
    <picture>
      <source type="image/avif" srcSet={set(src, "avif", info)} sizes={sizes} />
      <img
        src={src}
        srcSet={set(src, "webp", info)}
        sizes={sizes}
        alt={alt}
        width={info?.w}
        height={info?.h}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    </picture>
  );
}
