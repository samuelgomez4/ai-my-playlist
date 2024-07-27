import type { GetPlaylistRes } from '@/types'

export function filterPlaylistItemsData(getPlaylistRes: GetPlaylistRes) {
  const playlistItems = getPlaylistRes.items.map((item) => {
    const artists = item.track.artists.map((artist) => {
      return {
        name: artist.name,
      }
    })
    return {
      id: item.track.id,
      name: item.track.name,
      artists,
      album: {
        name: item.track.album.name,
        numberOfTracks: item.track.album.total_tracks,
      },
      durationInMiliseconds: item.track.duration_ms,
      releaseDate: item.track.album.release_date,
      addedByUserAt: item.added_at,
      popularity: item.track.popularity,
      explicit: item.track.explicit,
    }
  })
  return playlistItems
}
