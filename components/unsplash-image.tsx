"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import type { ChapterPhoto } from "@/lib/photos";

// Responsive images load directly from Unsplash's image CDN.
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 80}`;
}

export function UnsplashImage({ photo, sizes, priority = false }: {
  photo: ChapterPhoto;
  sizes: string;
  priority?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo-frame${ready ? " photo-ready" : ""}${failed ? " photo-failed" : ""}`}>
      <noscript><style>{".photo-frame img{opacity:1}.photo-placeholder{display:none}"}</style></noscript>
      {!failed && <Image loader={unsplashLoader} src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} onLoad={() => setReady(true)} onError={() => setFailed(true)} />}
      {!ready && !failed && <div className="photo-placeholder" aria-hidden="true"><span /><p>Loading photograph</p></div>}
      {failed && <div className="photo-fallback"><p>The photograph couldn&apos;t load.</p><a href={photo.source} target="_blank" rel="noreferrer">View on Unsplash ↗</a></div>}
    </div>
  );
}
