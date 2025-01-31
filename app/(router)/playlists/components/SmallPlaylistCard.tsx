'use client';
import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import type { PlaylistInfo } from '@/types/playlist';
import { SelectPlaylistButton } from '../../../components/playlist/SelectPlaylistButton';
import { useTransitionRouter } from 'next-view-transitions';
import { ViewSongsButton } from '@/components/playlist/ViewSongsButton';

interface Props {
  playlist: PlaylistInfo;
}

export function SmallPlaylistCard({ playlist }: Props) {
  const { id, name, songs } = playlist;
  const router = useTransitionRouter();

  return (
    <article className="relative z-0 max-w-[350px] shadow-xl">
      <div
        className="flex rounded-xl overflow-hidden border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${songs[0]?.image})` }}>
        <img
          src={songs[0]?.image}
          alt={name}
          className="object-cover transition-transform duration-300 min-w-[60px] w-32 aspect-square"
        />
        <div className="px-4 py-6 max-w-60 backdrop-blur-xl bg-black/30">
          <h3
            className="text-white font-semibold mb-3 text-lg overflow-hidden text-nowrap text-ellipsis"
            title={name}>
            {name}
          </h3>
          <div className="flex gap-2">
            <SelectPlaylistButton
              className="w-20"
              redirectToForm={() => {
                router.push('/');
              }}
              playlist={playlist}>
              Modify
            </SelectPlaylistButton>
            <ViewSongsButton playlistId={id}>Songs</ViewSongsButton>
            <DeleteButton title={name} />
          </div>
        </div>
      </div>
    </article>
  );
}
