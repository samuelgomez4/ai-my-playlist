import { PlaylistSlideShow } from './components/playlist-slide-show/PlaylistSlideShow';
import { PlaylistCreatorForm } from './components/playlist-creator-form/PlaylistCreatorForm';
import { SlideShowContextProvider } from '@/components/providers/SlideShowProvider';
import { SlideShowTitle } from './components/playlist-slide-show-title/SlideShowTitle';
import { Suspense } from 'react';

export const metadata = {
  title: 'AIMyPlaylist - Demo',
  description: 'Try AIMyPlaylist, an AI-powered playlist generator and editor',
};

export default function PlaylistCreatorPage() {
  return (
    <SlideShowContextProvider>
      <div className="max-w-7xl mx-auto">
        <section className="px-4 sm:px-8">
          <div className="text-center mb-8">
            <h1 className=" text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-4 text-balance">
              <span className="text-white">Be Creative and</span> AI Your Playlist
            </h1>
            <p className="text-gray-300 mt-2 text-base sm:text-xl max-w-prose mx-auto text-pretty">
              Describe your perfect playlist or click the wand to let the AI do that for you...
            </p>
          </div>
          <Suspense>
            <PlaylistCreatorForm />
          </Suspense>
        </section>
        <section className="mb-8 mx-auto">
          <SlideShowTitle />
          <PlaylistSlideShow />
        </section>
      </div>
    </SlideShowContextProvider>
  );
}
