import { useCallback, useEffect, useState } from 'react'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import type {
  PlaylistItems,
  HasNext,
  PlayListsItemsError,
  GetPlaylistRes,
  PlaylistDetails,
  Token,
} from '@/types'
import { filterPlaylistItemsData } from '@/services/filterPlaylistItemsData'

export function useCurrentPlaylist(token: Token) {
  const [currentPlaylistDetails, setCurrentPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [currentPlaylistSongs, setCurrentPlaylistSongs] =
    useState<PlaylistItems | null>(null)
  // TODO display error and loading
  const [error, setError] = useState<PlayListsItemsError | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasNext, setHasNext] = useState<HasNext>({ next: null })
  const updateCurrentPlaylistDetails = useCallback(
    (details: PlaylistDetails) => {
      setCurrentPlaylistDetails(details)
    },
    []
  )
  useEffect(() => {
    if (!token || !currentPlaylistDetails?.id) return
    axios
      .get(
        `https://api.spotify.com/v1/playlists/${currentPlaylistDetails.id}/tracks?offset=0&limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res: AxiosResponse) => {
        const playlistRes: GetPlaylistRes = res.data
        const hasMore = { next: playlistRes.next }
        const playlistsItems = filterPlaylistItemsData(playlistRes)
        setHasNext(hasMore)
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
  }
}
