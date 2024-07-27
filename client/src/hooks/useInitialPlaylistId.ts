import { useEffect, useRef } from 'react'
import type { Playlists } from '@/types'

export function useInitialPlaylistId(
  playlists: Playlists | null,
  updateCurrentPlaylistId: (id: string) => void
) {
  const isFirstPlaylistsRender = useRef(true)
  useEffect(() => {
    if (isFirstPlaylistsRender.current && playlists) {
      const initialPlaylistId = playlists[0].id
      updateCurrentPlaylistId(initialPlaylistId)
      isFirstPlaylistsRender.current = false
    }
  }, [playlists, updateCurrentPlaylistId])
}
