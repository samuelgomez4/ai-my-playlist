import { usePlaylistsStore } from '@/store/playlists';
import { useEffect } from 'react';

export function usePlaylists() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  useEffect(() => {
    usePlaylistsStore.persist.rehydrate();
  }, []);
  return playlists;
}
