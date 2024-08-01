import type { AxiosError } from 'axios'
import axios from 'axios'
import type {
  AddSongsParams,
  GetPlaylistRes,
  PlaylistId,
  PlayListsItemsError,
  Token,
} from '@/types'

export function getTracksEndpoint({
  playlistId,
  offset = '0',
  limit = '50',
}: {
  playlistId: PlaylistId
  offset?: string
  limit?: string
}) {
  return `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`
}

export function getAddSongsEndpoint({
  playlistId,
}: {
  playlistId: PlaylistId
}) {
  return `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
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

export async function addSongs({
  token,
  playlistId,
  songsUrisToAdd,
}: AddSongsParams) {
  const addSongsEndpoint = getAddSongsEndpoint({ playlistId })
  const addSongBody = {
    uris: songsUrisToAdd,
    position: 0,
  }
  const addSongHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  try {
    await axios.post(addSongsEndpoint, addSongBody, { headers: addSongHeaders })
  } catch (error) {
    const axiosError = error as AxiosError
    const playlistsItemsError = axiosError.response?.data as PlayListsItemsError
    throw playlistsItemsError.error
  }
}
