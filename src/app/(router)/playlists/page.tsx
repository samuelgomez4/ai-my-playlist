import { playlists } from '@/interfaces/playlist-info-response';
import { SmallPlaylistCard } from './components/SmallPlaylistCard';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'next-view-transitions';

export default function PlaylistsPage() {
  return (
    <section className="mb-8 px-4">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-10 [view-transition-name:title]">
        Your Playlists
      </h2>
      <Link
        href={'./'}
        className="text-white">
        Go to prompt input
      </Link>
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search playlists"
          className="w-full bg-gray-800 text-white pl-10 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="grid py-12 px-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 justify-items-center">
        {playlists.map((playlist) => (
          <SmallPlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        ))}
        <div className="w-full max-w-[350px] min-h-32 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-300 border-2 border-dashed border-gray-700 hover:border-purple-500 h-full">
          <FaPlusCircle className="text-4xl text-purple-500 hover:text-purple-400 transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
