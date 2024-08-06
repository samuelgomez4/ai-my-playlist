import { useEffect, useState } from 'react'
import type { PlaylistsDetailsList, PlayListsRes } from '../types'
import { filterPlaylistsData } from '@/services/filterPlaylistsData'
import { fetchPlaylists } from '@/services/spotifyAPI'

export function usePlaylists(token: string | undefined) {
  const [playlists, setPlaylists] = useState<PlaylistsDetailsList | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const updatePlaylists = (newPlaylists: PlayListsRes) => {
    const playlistsItems = filterPlaylistsData(newPlaylists)
    setPlaylists(playlistsItems)
  }
  // indicates whether there are more playlists to fetch or not
  useEffect(() => {
    if (!token) return
    // return only 10 playlists initially
    fetchPlaylists({ token })
      .then((playlistsRes) => {
        updatePlaylists(playlistsRes)
      })
      .catch((e) => {
        const playlistsItemsError = e as Error
        setError(playlistsItemsError.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token])
  return { playlists, error, isLoading, updatePlaylists }
}
