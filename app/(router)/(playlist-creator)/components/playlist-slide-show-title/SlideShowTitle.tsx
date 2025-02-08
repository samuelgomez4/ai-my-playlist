'use client';

import { useSlideShow } from '@/hooks/useSlideShow';

export function SlideShowTitle() {
  const { slideShowTitleRef } = useSlideShow();

  return (
    <h2
      ref={slideShowTitleRef}
      className="text-2xl sm:text-4xl font-bold text-white mb-2 px-4 sm:px-8">
      Your Playlists
    </h2>
  );
}
