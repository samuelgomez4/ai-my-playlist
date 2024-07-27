import { useCallback, useState } from 'react'

export function useCurrentPlaylist() {
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string>('')
  const updateCurrentPlaylistId = useCallback((id: string) => {
    setCurrentPlaylistId(id)
  }, [])

  return { currentPlaylistId, updateCurrentPlaylistId }
}
