import { DeletePlaylistButton } from '@/components/delete-playlist/DeletePlaylistButton';
import { SelectPlaylistButton } from '@/components/ui/playlist/SelectPlaylistButton';
import { ViewSongsButton } from '@/components/ui/playlist/ViewSongsButton';
import type { PlaylistInfo } from '@/types/playlist';
import { CustomImage } from '@/components/ui/CustomImage';

interface Props {
  playlist: PlaylistInfo;
}

export function PlaylistCard({ playlist }: Props) {
  const { id, name, songs } = playlist;

  return (
    <article className="w-56 relative z-0 shadow-xl">
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        <CustomImage
          src={songs[0]?.image}
          alt="card background image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-full rounded-xl overflow-hidden backdrop-blur-2xl bg-black/50 border border-gray-700/50 hover:border-purple-600/60">
        <CustomImage
          src={songs[0]?.image}
          alt={name}
          className={`w-full h-48 object-cover transition-transform duration-300`}
        />
        <div className="px-4 pt-4 pb-6">
          <h3
            className={`text-white font-semibold mb-1 text-lg text-nowrap text-ellipsis overflow-hidden`}
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
              <DeletePlaylistButton
                id={id}
                itemName={name}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
