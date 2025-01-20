import { features } from '@/utils/constants';
import { FaMagic } from 'react-icons/fa';
import { PlaylistSlideShow } from './components/PlaylistSlideShow/PlaylistSlideShow';
import { playlists } from '../../../interfaces/playlist-info-response';
import { Link } from 'next-view-transitions';

export default function DashboardPage() {
  return (
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
        <div className="relative mb-6">
          <textarea
            className="w-full h-32 bg-gray-800 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe your perfect playlist or click the magic wand to let the AI do that for you..."
          />
          <button className="absolute bottom-4 right-4 text-purple-300 hover:text-purple-400">
            <FaMagic className="text-2xl transition-colors duration-300" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <select className="flex-1 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">Select an action</option>
            {features.map((feature) => (
              <option
                key={feature.title}
                value={feature.title}>
                {feature.title}
              </option>
            ))}
          </select>
          <select className="flex-1 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">Select a playlist</option>
            {playlists.map((playlist) => (
              <option
                key={playlist.id}
                value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>

          <button className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold tracking-wide">
            <span className="flex items-center justify-center gap-2">AI My Playlist</span>
          </button>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 px-4 [view-transition-name:title]">
          Your Playlists
        </h2>
        <Link
          href={'./playlists'}
          className="text-white">
          See all playlists
        </Link>
        <PlaylistSlideShow playlists={playlists} />
      </section>
    </div>
  );
}
