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
import { fetchSongs, getTracksEndpoint } from '@/services/spotifyAPI'

export function useCurrentPlaylist(token: Token) {
  const [currentPlaylistDetails, setCurrentPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [currentPlaylistSongs, setCurrentPlaylistSongs] =
    useState<PlaylistItems | null>(null)
  // TODO display error and loading
  const [error, setError] = useState<Error | null>(null)
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
    setIsLoading(true)
    const tracksEndpoint = getTracksEndpoint({
      playlistId: currentPlaylistDetails.id,
      limit: '20',
    })
    fetchSongs({ tracksEndpoint, userToken: token })
      .then((playlistRes: GetPlaylistRes) => {
        const playlistsItems = filterPlaylistItemsDataToShow(playlistRes)
        setnextEndpoint({ next: playlistRes.next })
        setCurrentPlaylistSongs(playlistsItems)
      })
      .catch((e: Error) => {
        setError(e)
        console.log(e.message)
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