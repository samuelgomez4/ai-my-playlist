import { useSelectedPlaylistStore } from '@/store/selected-playlist-store';
import { useEffect } from 'react';

export function useSelectedPlaylist() {
  const selectedPlaylist = useSelectedPlaylistStore((store) => store.selectedPlaylist);
  const selectPlaylist = useSelectedPlaylistStore((store) => store.setSelectedPlaylist);
  useEffect(() => {
    useSelectedPlaylistStore.persist.rehydrate();
  }, []);
  return { selectedPlaylist, selectPlaylist };
}
