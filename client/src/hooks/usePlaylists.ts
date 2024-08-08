import { useEffect, useRef, useState } from 'react'
import type { NextEndpoint, PlaylistsDetailsList, PlayListsRes } from '../types'
import { filterPlaylistsData } from '@/services/filterPlaylistsData'
import { fetchPlaylists, getPlaylistsEndpoint } from '@/services/spotifyAPI'

export function usePlaylists(token: string | undefined) {
  const isFirstRender = useRef(true)
  const [playlists, setPlaylists] = useState<PlaylistsDetailsList>([])
  const [nextEndpoint, setNextEndpoint] = useState<NextEndpoint | null>(() =>
    getPlaylistsEndpoint({ limit: '10' })
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const updatePlaylists = (newPlaylists: PlayListsRes, reset = false) => {
    const playlistsItems = filterPlaylistsData(newPlaylists)
    if (reset) {
      setPlaylists(playlistsItems)
      setNextEndpoint(newPlaylists.next)
    } else {
      setPlaylists((prevPlaylists) => [...prevPlaylists, ...playlistsItems])
    }
  }
  const fetchPlaylistsForUser = async () => {
    if (!nextEndpoint) return
    setIsLoading(true)
    setError(null)
    try {
      const playlistsRes = await fetchPlaylists({
        token,
        playlistsUrl: nextEndpoint,
      })
      updatePlaylists(playlistsRes)
      setNextEndpoint(playlistsRes.next)
    } catch (e) {
      const playlistsError = e as Error
      setError(playlistsError.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!token || !nextEndpoint) return
    if (!isFirstRender.current) return
    fetchPlaylistsForUser().then(() => {
      isFirstRender.current = false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return {
    playlists,
    error,
    isLoading,
    updatePlaylists,
    nextEndpoint,
    fetchPlaylistsForUser,
  }
}
