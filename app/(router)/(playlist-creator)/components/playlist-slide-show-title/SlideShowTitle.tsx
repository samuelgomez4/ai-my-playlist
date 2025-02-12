'use client';

import { useSlideShow } from '@/hooks/useSlideShow';

export function SlideShowTitle({ className }: { className?: string }) {
  const { slideShowTitleRef } = useSlideShow();

  return (
    <h2
      ref={slideShowTitleRef}
      className={`${className}`}>
      Your Playlists
    </h2>
  );
}
