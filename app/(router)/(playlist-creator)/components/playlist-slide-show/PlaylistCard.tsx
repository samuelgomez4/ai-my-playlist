import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import { useSelectedPlaylistStore } from '@/store/selected-playlist-store';
import type { PlaylistInfo } from '@/types/playlist-info';
import { Link } from 'next-view-transitions';

interface Props {
  playlist: PlaylistInfo;
}

export function PlaylistCard({ playlist }: Props) {
  const { id, name, image, songCount } = playlist;
  const selectPlaylist = useSelectedPlaylistStore((store) => store.setSelectedPlaylist);

  const handleSelectPlaylist = () => {
    selectPlaylist({ id, name, image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="w-56 relative group z-0">
      <div className="absolute inset-0 -z-10 rounded-xl scale-x-90 scale-y-95">
        <img
          src={image}
          alt="card background image"
          className="w-full h-full object-cover blur-xl"
        />
      </div>
      <div className=" h-full rounded-xl overflow-hidden backdrop-blur-xl bg-black/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 [view-transition-name:playlist-image-${id}]`}
        />
        <div className="px-4 pt-4 pb-6">
          <h3
            className={`text-white font-semibold mb-1 text-lg text-nowrap text-ellipsis overflow-hidden [view-transition-name:playlist-name-${id}]`}
            title={name}>
            {name}
          </h3>
          <p className="text-gray-300 text-sm mb-4">{songCount} songs</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSelectPlaylist}
              className="w-full px-3 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
              Select to Modify
            </button>
            <div className="flex items-center gap-2">
              <Link
                href={`/playlist/${id}`}
                className="flex-1 px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-gray-500/30">
                View Songs
              </Link>
              <DeleteButton title={name} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
