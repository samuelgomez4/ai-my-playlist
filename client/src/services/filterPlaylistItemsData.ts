import type { GetPlaylistRes } from '@/types'
import { formatDate } from './formatDate'
import { formatDuration } from './formatDuration'

export function filterPlaylistItemsData(getPlaylistRes: GetPlaylistRes) {
  const playlistItems = getPlaylistRes.items.map((item) => {
    const artists = item.track.artists.map((artist) => {
      return {
        name: artist.name,
      }
    })
    const releaseDate = formatDate(item.track.album.release_date)
    const addedByUserAt = formatDate(item.added_at)
    const duration = formatDuration(item.track.duration_ms)
    return {
      id: item.track.id,
      name: item.track.name,
      artists,
      album: {
        name: item.track.album.name,
        numberOfTracks: item.track.album.total_tracks,
        imageUrl: item.track.album.images[0].url,
      },
      duration,
      releaseDate,
      addedByUserAt,
      popularity: item.track.popularity,
      explicit: item.track.explicit,
    }
  })
  return playlistItems
}
