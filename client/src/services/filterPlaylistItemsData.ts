import type { GetPlaylistRes } from '@/types'

const dateOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
} as const

function formatDate(date: string) {
  const unformattedDate = new Date(date)
  const formattedDate = new Intl.DateTimeFormat(undefined, dateOptions).format(
    unformattedDate
  )
  return formattedDate
}

function formatDuration(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function filterPlaylistItemsDataToShow(getPlaylistRes: GetPlaylistRes) {
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
        imageUrl: item.track.album.images[0]
          ? item.track.album.images[0].url
          : '',
      },
      duration,
      releaseDate,
      addedByUserAt,
    }
  })
  return playlistItems
}

// TODO: decide what other data to include
export function filterPlaylistItemsDataForAi(getPlaylistRes: GetPlaylistRes) {
  const playlistItems = getPlaylistRes.items.map((item) => {
    const artists = item.track.artists.map((artist) => {
      return artist.name
    })
    const releaseDate = formatDate(item.track.album.release_date)
    const addedByUserAt = formatDate(item.added_at)
    const duration = formatDuration(item.track.duration_ms)
    return [
      item.track.id,
      item.track.name,
      artists,
      item.track.album.name,
      duration,
      releaseDate,
      addedByUserAt,
    ]
  })
  return playlistItems
}
