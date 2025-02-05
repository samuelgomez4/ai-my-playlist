'use client';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import type { PlaylistInfo } from '@/types/playlist';
import clsx from 'clsx';

interface Props {
  className?: string;
  playlist: PlaylistInfo;
  children: React.ReactNode;
  redirectToForm: () => void;
}

export function SelectPlaylistButton({ className, children, playlist, redirectToForm }: Props) {
  const { id, name, songs } = playlist;
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const handleSelectPlaylist = () => {
    selectPlaylist({ id, name, image: songs[0].image });
    redirectToForm();
  };

  return (
    <>
      <button
        onClick={handleSelectPlaylist}
        className={clsx(`w-full px-3 py-2  text-white rounded-lg ${className}`, {
          'bg-purple-600/70 hover:bg-purple-600 transition-all duration-300 shadow-lg':
            selectedPlaylist?.id !== id,
          'bg-gray-900/50 ring-2 ring-purple-600 pointer-events-none': selectedPlaylist?.id === id,
        })}>
        {selectedPlaylist?.id !== playlist.id ? children : 'Selected'}
      </button>
    </>
  );
}
