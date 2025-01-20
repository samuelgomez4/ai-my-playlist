import type { PlaylistInfo } from '@/interfaces/playlist-info-response';
import { FaTrash } from 'react-icons/fa';

interface Props {
  playlist: PlaylistInfo;
}

export function SmallPlaylistCard({ playlist }: Props) {
  return (
    <article className="relative group z-0 max-w-[350px] shadow-xl">
      <div
        className="flex rounded-xl overflow-hidden border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${playlist.image})` }}>
        <img
          src={playlist.image}
          alt={playlist.name}
          className="object-cover group-hover:scale-105 transition-transform duration-300 min-w-[60px] w-32 aspect-square"
        />
        <div className="px-4 py-6 max-w-56 backdrop-blur-xl bg-black/30">
          <h3
            className="text-white font-semibold mb-3 text-lg overflow-hidden text-nowrap text-ellipsis"
            title={playlist.name}>
            {playlist.name}
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
              Modify
            </button>
            <button className="text-ellipsis px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-gray-500/30">
              Songs
            </button>
            <button
              title="delete"
              className="p-3 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/30">
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
