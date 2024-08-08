import { useEffect } from 'react'
import type { PlaylistDetails, PlaylistsDetailsList } from '@/types'

export function useInitialPlaylistDetails(
  playlists: PlaylistsDetailsList,
  updateCurrentPlaylistDetails: (details: PlaylistDetails) => void
) {
  useEffect(() => {
    if (playlists[0]) {
      const initialPlaylistDetails = playlists[0]
      updateCurrentPlaylistDetails(initialPlaylistDetails)
    }
  }, [playlists, updateCurrentPlaylistDetails])
}
