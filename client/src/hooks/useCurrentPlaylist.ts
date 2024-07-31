import { useCallback, useEffect, useState } from 'react'
import type { AxiosError, AxiosResponse } from 'axios'
import type {
  PlaylistItems,
  NextEndpoint,
  PlayListsItemsError,
  GetPlaylistRes,
  PlaylistDetails,
  Token,
} from '@/types'
import { filterPlaylistItemsDataToShow } from '@/services/filterPlaylistItemsData'
import { fetchSongs } from '@/services/fetchSongs'

export function useCurrentPlaylist(token: Token) {
  const [currentPlaylistDetails, setCurrentPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [currentPlaylistSongs, setCurrentPlaylistSongs] =
    useState<PlaylistItems | null>(null)
  // TODO display error and loading
  const [error, setError] = useState<PlayListsItemsError | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nextEndpoint, setnextEndpoint] = useState<NextEndpoint>({ next: null })
  const updateCurrentPlaylistDetails = useCallback(
    (details: PlaylistDetails) => {
      setCurrentPlaylistDetails(details)
    },
    []
  )

  useEffect(() => {
    if (!token || !currentPlaylistDetails?.id) return
    const tracksEndpoint = `https://api.spotify.com/v1/playlists/${currentPlaylistDetails.id}/tracks?offset=0&limit=20`
    fetchSongs({ tracksEndpoint, userToken: token })
      .then((res: AxiosResponse) => {
        const playlistRes: GetPlaylistRes = res.data
        const hasMore = { next: playlistRes.next }
        const playlistsItems = filterPlaylistItemsDataToShow(playlistRes)
        setnextEndpoint(hasMore)
        setCurrentPlaylistSongs(playlistsItems)
      })
      .catch((e: AxiosError) => {
        const playlistsItemsError = e.response?.data as PlayListsItemsError
        setError(playlistsItemsError)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token, currentPlaylistDetails])
  return {
    currentPlaylistDetails,
    currentPlaylistSongs,
    updateCurrentPlaylistDetails,
    fetchSongs,
  }
}
