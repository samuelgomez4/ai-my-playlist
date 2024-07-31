import type { AxiosError } from 'axios'
import axios from 'axios'
import type { GetPlaylistRes, PlayListsItemsError, Token } from '@/types'

export function getTracksEndpoint({
  playlistId,
  offset = '0',
  limit = '50',
}: {
  playlistId: string
  offset?: string
  limit?: string
}) {
  return `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`
}

export async function fetchSongs({
  tracksEndpoint,
  userToken,
}: {
  tracksEndpoint: string
  userToken: Token
}) {
  try {
    const res = await axios.get(tracksEndpoint, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    const playlistRes: GetPlaylistRes = res.data
    return playlistRes
  } catch (error) {
    const axiosError = error as AxiosError
    const playlistsItemsError = axiosError.response?.data as PlayListsItemsError
    throw playlistsItemsError.error
  }
}
