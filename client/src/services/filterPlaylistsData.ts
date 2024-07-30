import type { PlayListsRes } from '../types'

export function filterPlaylistsData(playlistsRes: PlayListsRes) {
  return playlistsRes.items.map((playlist) => {
    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      public: playlist.public,
      owner: playlist.owner.display_name,
      numberTracks: playlist.tracks.total,
      imageUrl: playlist.images[0].url,
    }
  })
}
