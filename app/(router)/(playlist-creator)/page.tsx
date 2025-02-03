import { PlaylistSlideShow } from './components/playlist-slide-show/PlaylistSlideShow';
import { Link } from 'next-view-transitions';
import { PlaylistCreatorForm } from './components/playlist-creator-form/PlaylistCreatorForm';
import { SlideShowContextProvider } from '@/components/providers/SlideShowProvider';
import { SlideShowTitle } from './components/playlist-slide-show-title/SlideShowTitle';

export default function PlaylistCreatorPage() {
  return (
    <SlideShowContextProvider>
      <div className="max-w-7xl mx-auto lg:px-8">
        <section className="px-4">
          <div className="text-center mb-8">
            <h1 className=" text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-4 text-balance">
              <span className="text-white">Be creative and</span> AI your playlist
            </h1>
            <p className="text-gray-300 mt-2 text-lg sm:text-xl text-pretty">
              Type a prompt and select the action you want to do
            </p>
          </div>
          <PlaylistCreatorForm />
        </section>
        <section className="mb-8">
          <SlideShowTitle />
          <Link
            href={'./playlists'}
            className="text-white">
            See all playlists
          </Link>
          <PlaylistSlideShow />
        </section>
      </div>
    </SlideShowContextProvider>
  );
}
