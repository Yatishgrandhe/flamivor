import { UnsplashImage } from "@/components/unsplash-image";
import type { ChapterPhoto } from "@/lib/photos";

export function PhotoCredit({ photo }: { photo: ChapterPhoto }) {
  return <span className="photo-credit">Stock photograph · <a href={photo.source} target="_blank" rel="noreferrer">{photo.photographer} / Unsplash ↗</a></span>;
}

export function PhotoBand({ photo, caption }: { photo: ChapterPhoto; caption: string }) {
  return <figure className="photo-band shell"><div className="photo-band-crop"><div className="photo-parallax"><UnsplashImage photo={photo} sizes="(max-width: 767px) 100vw, 90vw" /></div></div><figcaption><span>{caption}</span><PhotoCredit photo={photo} /></figcaption></figure>;
}
