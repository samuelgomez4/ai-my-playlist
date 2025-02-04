import { PlaylistSlideShow } from './components/playlist-slide-show/PlaylistSlideShow';
import { PlaylistCreatorForm } from './components/playlist-creator-form/PlaylistCreatorForm';
import { SlideShowContextProvider } from '@/components/providers/SlideShowProvider';
import { SlideShowTitle } from './components/playlist-slide-show-title/SlideShowTitle';
import { Suspense } from 'react';

export default function PlaylistCreatorPage() {
  return (
    <SlideShowContextProvider>
      <div className="max-w-7xl mx-auto lg:px-8">
        <section className="px-4">
          <div className="text-center mb-8">
            <h1 className=" text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-4 text-balance">
              <span className="text-white">Be creative and</span> AI your playlist
            </h1>
            <p className="text-gray-300 mt-2 text-lg sm:text-xl ">
              Describe your perfect playlist or click the magic wand to let the AI do that for
              you...
            </p>
          </div>
          <Suspense>
            <PlaylistCreatorForm />
          </Suspense>
        </section>
        <section className="mb-8">
          <SlideShowTitle />
          <PlaylistSlideShow />
        </section>
      </div>
    </SlideShowContextProvider>
  );
}
