import { UnsplashImage } from "@/components/unsplash-image";
import type { ChapterPhoto } from "@/lib/photos";

export function PhotoBand({ photo, caption }: { photo: ChapterPhoto; caption: string }) {
  return <figure className="photo-band shell"><div className="photo-band-crop"><div className="photo-parallax"><UnsplashImage photo={photo} sizes="(max-width: 767px) 100vw, 90vw" /></div></div><figcaption><span>{caption}</span></figcaption></figure>;
}
