import { usePlaylistsStore } from '@/store/playlists';
import { useCallback, useEffect } from 'react';

export function usePlaylists() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  useEffect(() => {
    usePlaylistsStore.persist.rehydrate();
  }, []);
  const getFilteredPlaylists = useCallback(
    (query: string) => {
      const playlistsArray = Object.values(playlists);
      if (!query) return playlistsArray;
      const filteredPlaylists = playlistsArray.filter((playlist) => {
        const name = playlist.name.toLowerCase();
        const description = playlist.description.toLowerCase();
        const queryLower = query.toLowerCase();
        return name.includes(queryLower) || description.includes(queryLower);
      });
      return filteredPlaylists;
    },
    [playlists]
  );
  return { playlists, getFilteredPlaylists };
}
