import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { PlayListsItemsError, PlayListsRes } from '../types'

export function usePlaylists(token: string | undefined) {
  const [playlists, setPlaylists] = useState(null)
  useEffect(() => {
    if (!token) return
    axios
      .get('https://api.spotify.com/v1/me/playlists?offset=0&limit=50', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        const playlistsRes: PlayListsRes = res.data
        console.log(playlistsRes)
      })
      .catch((e: AxiosError) => {
        const playlistsItemsError = e.response?.data as PlayListsItemsError
        console.log(playlistsItemsError.error)
      })
  }, [token])
  return playlists
}
