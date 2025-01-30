import type { Songs } from '@/types/playlist';

export function formatSongsForAi(songs: Songs) {
  if (songs.length === 0) return [];
  return songs.map((song) => [
    song.id,
    song.title,
    song.artists,
    song.album,
    song.duration,
    song.releaseDate,
    song.addedOn,
  ]);
}
