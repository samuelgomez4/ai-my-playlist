import { SelectPlaylistButton } from '@/components/playlist/SelectPlaylistButton';
import { ViewSongsButton } from '@/components/playlist/ViewSongsButton';
import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import type { PlaylistInfo } from '@/types/playlist';

interface Props {
  playlist: PlaylistInfo;
}

export function PlaylistCard({ playlist }: Props) {
  const { id, name, songs } = playlist;

  return (
    <article className="w-56 relative z-0">
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        <img
          src={songs[0]?.image}
          alt="card background image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-full rounded-xl overflow-hidden backdrop-blur-2xl bg-black/50 border border-gray-700/50 hover:border-purple-600/60">
        <img
          src={songs[0]?.image}
          alt={name}
          className={`w-full h-48 object-cover transition-transform duration-300 [view-transition-name:playlist-image-${id}]`}
        />
        <div className="px-4 pt-4 pb-6">
          <h3
            className={`text-white font-semibold mb-1 text-lg text-nowrap text-ellipsis overflow-hidden [view-transition-name:playlist-name-${id}]`}
            title={name}>
            {name}
          </h3>
          <p className="text-gray-300 text-sm mb-4">{songs.length} songs</p>
          <div className="flex flex-col gap-2">
            <SelectPlaylistButton
              redirectToForm={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              playlist={playlist}>
              Select to Modify
            </SelectPlaylistButton>
            <div className="flex items-center gap-2">
              <ViewSongsButton
                className="flex-1"
                playlistId={id}>
                View Songs
              </ViewSongsButton>
              <DeleteButton title={name} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
