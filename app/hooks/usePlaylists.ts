import { usePlaylistsStore } from '@/store/playlists-store';
import { useEffect, useMemo, useState } from 'react';

export function usePlaylists(query = '') {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const [isLoading, setIsLoading] = useState(true);
  const playlistsArray = useMemo(() => Object.values(playlists), [playlists]);
  useEffect(() => {
    usePlaylistsStore.persist.rehydrate();
    setIsLoading(false);
  }, []);
  const filteredPlaylists = () => {
    if (query === '') return playlistsArray;
    const filterResult = playlistsArray.filter((playlist) => {
      const name = playlist.name.toLowerCase();
      const description = playlist.description.toLowerCase();
      const queryLower = query.toLowerCase();
      return name.includes(queryLower) || description.includes(queryLower);
    });
    return filterResult;
  };
  return { playlists, filteredPlaylists, isLoading };
}
