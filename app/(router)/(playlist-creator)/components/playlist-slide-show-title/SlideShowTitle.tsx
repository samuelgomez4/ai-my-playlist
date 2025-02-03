'use client';

import { useSlideShow } from '@/hooks/useSlideShow';

export function SlideShowTitle() {
  const { slideShowTitleRef } = useSlideShow();

  return (
    <h2
      ref={slideShowTitleRef}
      className="text-2xl sm:text-4xl font-bold text-white mb-2 px-4 [view-transition-name:your-playlists-title]">
      Your Playlists
    </h2>
  );
}
