import { useCallback, useEffect, useState } from 'react'
import type {
  PlaylistItems,
  NextEndpoint,
  GetPlaylistRes,
  PlaylistDetails,
  Token,
} from '@/types'
import { filterPlaylistItemsDataToShow } from '@/services/filterPlaylistItemsData'
import { fetchSongs, getTracksEndpoint } from '@/services/spotifyAPI'

export function useCurrentPlaylist(token: Token) {
  const [currentPlaylistDetails, setCurrentPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [currentPlaylistSongs, setCurrentPlaylistSongs] =
    useState<PlaylistItems>([])
  // TODO display error and loading
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nextEndpoint, setnextEndpoint] = useState<NextEndpoint>(null)
  const updateCurrentPlaylistDetails = useCallback(
    (details: PlaylistDetails) => {
      const tracksEndpoint = getTracksEndpoint({
        playlistId: details.id,
        limit: '50',
      })
      setCurrentPlaylistDetails(details)
      setnextEndpoint(tracksEndpoint)
      setCurrentPlaylistSongs([])
    },
    []
  )
  const fetchSongsForCurrentPlaylist = async () => {
    if (!token || !currentPlaylistDetails?.id || !nextEndpoint) return
    setIsLoading(true)
    setError(null)
    try {
      const playlistRes: GetPlaylistRes = await fetchSongs({
        tracksEndpoint: nextEndpoint,
        userToken: token,
      })
      const playlistsItems = filterPlaylistItemsDataToShow(playlistRes)
      setnextEndpoint(playlistRes.next)
      setCurrentPlaylistSongs((prev) => [...prev, ...playlistsItems])
    } catch (e) {
      const fetchSongsError = e as Error
      setError(fetchSongsError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSongsForCurrentPlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylistDetails])

  return {
    currentPlaylistDetails,
    currentPlaylistSongs,
    updateCurrentPlaylistDetails,
    error,
    isLoading,
    nextEndpoint,
    fetchSongsForCurrentPlaylist,
  }
}
