'use client';
import { useSelectedPlaylistStore } from '@/store/selected-playlist-store';
import type { PlaylistInfo } from '@/types/playlist-info';
import { useTransitionRouter } from 'next-view-transitions';

interface Props {
  playlist: PlaylistInfo;
  children: React.ReactNode;
}

export function SelectPlaylistButton({ children, playlist }: Props) {
  const { id, name, image } = playlist;
  const selectPlaylist = useSelectedPlaylistStore((store) => store.setSelectedPlaylist);
  const router = useTransitionRouter();

  const handleSelectPlaylist = () => {
    selectPlaylist({ id, name, image });
    router.push('/');
  };

  return (
    <>
      <button
        onClick={handleSelectPlaylist}
        className="px-3 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
        {children}
      </button>
    </>
  );
}
