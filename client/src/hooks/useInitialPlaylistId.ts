import { useEffect, useRef } from 'react'
import type { PlaylistDetails, PlaylistsDetailsList } from '@/types'

export function useInitialPlaylistDetails(
  playlists: PlaylistsDetailsList | null,
  updateCurrentPlaylistDetails: (details: PlaylistDetails) => void
) {
  const isFirstPlaylistsRender = useRef(true)
  useEffect(() => {
    if (isFirstPlaylistsRender.current && playlists) {
      const initialPlaylistDetails = playlists[0]
      updateCurrentPlaylistDetails(initialPlaylistDetails)
      isFirstPlaylistsRender.current = false
    }
  }, [playlists, updateCurrentPlaylistDetails])
}
