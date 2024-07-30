import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type {
  NextEndpoint,
  PlaylistsDetailsList,
  PlayListsItemsError,
  PlayListsRes,
} from '../types'
import { filterPlaylistsData } from '@/services/filterPlaylistsData'

export function usePlaylists(token: string | undefined) {
  const [playlists, setPlaylists] = useState<PlaylistsDetailsList | null>(null)
  const [error, setError] = useState<PlayListsItemsError | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // indicates whether there are more playlists to fetch or not
  const [hasNext, setHasNext] = useState<NextEndpoint>({ next: null })
  useEffect(() => {
    if (!token) return
    // return only 10 playlists initially
    axios
      .get('https://api.spotify.com/v1/me/playlists?offset=0&limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        const playlistsRes: PlayListsRes = res.data
        const hasMore = { next: playlistsRes.next }
        const playlistsItems = filterPlaylistsData(playlistsRes)
        setHasNext(hasMore)
        setPlaylists(playlistsItems)
      })
      .catch((e: AxiosError) => {
        const playlistsItemsError = e.response?.data as PlayListsItemsError
        setError(playlistsItemsError)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token])
  return { playlists, error, isLoading, hasNext }
}
