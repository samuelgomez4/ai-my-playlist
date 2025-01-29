import type { Id } from '@/types/playlist-info';
import { playlists } from './constants/playlists';

export function formatSongsForAi(playlistId: Id | undefined) {
  if (playlistId === undefined) return [];
  const playlist = playlists[playlistId];
  if (!playlist) {
    throw new Error('Playlist not found');
  }

  return playlist.songs.map((song) => [
    song.title,
    song.artists,
    song.album,
    song.duration,
    song.releaseDate,
    song.addedOn,
  ]);
}
