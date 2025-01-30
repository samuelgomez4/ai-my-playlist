import type { Song } from '../../../types/playlist';
import type { Item } from '../types/SearchRes';

export function formatSongToAdd(item: Item): Song {
  return {
    id: item.id,
    title: item.name,
    artists: item.artists.map((artist) => artist.name),
    album: item.album.name,
    image: item.album.images[0]?.url || '',
    releaseDate: item.album.release_date,
    duration: `${Math.floor(item.duration_ms / 60000)}:${Math.floor(
      (item.duration_ms % 60000) / 1000
    )
      .toFixed(0)
      .padStart(2, '0')}`,
    addedOn: new Date().toISOString(),
  };
}
