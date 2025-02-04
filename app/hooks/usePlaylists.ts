import { usePlaylistsStore } from '@/store/playlists';
import { useEffect, useMemo } from 'react';

export function usePlaylists(query = '') {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const playlistsArray = useMemo(() => Object.values(playlists), [playlists]);
  useEffect(() => {
    usePlaylistsStore.persist.rehydrate();
  }, []);
  const filteredPlaylists = useMemo(() => {
    if (query === '') return playlistsArray;
    const filterResult = playlistsArray.filter((playlist) => {
      const name = playlist.name.toLowerCase();
      const description = playlist.description.toLowerCase();
      const queryLower = query.toLowerCase();
      return name.includes(queryLower) || description.includes(queryLower);
    });
    return filterResult;
  }, [playlistsArray, query]);
  return { playlists, filteredPlaylists };
}
