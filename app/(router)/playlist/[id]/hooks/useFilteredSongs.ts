import { usePlaylists } from '@/hooks/usePlaylists';
import { useSongQuerytStore } from '@/store/song-query-store';
import type { Id } from '@/types/playlist';
import { useMemo } from 'react';

export function useFilteredSongs(id: Id) {
  const { playlists, isLoading } = usePlaylists();
  const query = useSongQuerytStore((state) => state.query);
  const songs = useMemo(() => playlists[id]?.songs, [playlists, id]);
  const filteredSongs = () => {
    if (!query) return songs;
    return songs.filter((song) => {
      const songTitle = song.title.toLowerCase();
      const lowercaseSongQuery = query.toLowerCase();
      const songArtist = song.artists.join(', ').toLowerCase();
      const songAlbum = song.album.toLowerCase();
      return (
        songArtist.includes(lowercaseSongQuery) ||
        songAlbum.includes(lowercaseSongQuery) ||
        songTitle.includes(lowercaseSongQuery.toLowerCase())
      );
    });
  };
  return { filteredSongs, isLoading };
}
