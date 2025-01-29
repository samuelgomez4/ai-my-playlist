import type { Songs } from '@/types/playlist';

export function formatSongsForAi(songs: Songs | undefined) {
  if (songs === undefined) return [];
  return songs.map((song) => [
    song.title,
    song.artists,
    song.album,
    song.duration,
    song.releaseDate,
    song.addedOn,
  ]);
}
