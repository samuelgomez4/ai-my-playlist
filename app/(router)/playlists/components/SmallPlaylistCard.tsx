'use client';
import { DeleteButton } from '@/components/ui/delete-button/DeleteButton';
import type { PlaylistInfo } from '@/types/playlist-info';
import { SelectPlaylistButton } from './SelectPlaylistButton';
import { useTransitionRouter } from 'next-view-transitions';

interface Props {
  playlist: PlaylistInfo;
}

export function SmallPlaylistCard({ playlist }: Props) {
  const { name, image } = playlist;
  const router = useTransitionRouter();

  return (
    <article className="relative z-0 max-w-[350px] shadow-xl">
      <div
        className="flex rounded-xl overflow-hidden border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}>
        <img
          src={image}
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
            <button className="text-ellipsis px-3 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-gray-500/30">
              Songs
            </button>
            <DeleteButton title={name} />
          </div>
        </div>
      </div>
    </article>
  );
}
