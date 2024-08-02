import type {
  AddSongsParams,
  GetProfileRes,
  Playlist,
  PlaylistId,
  SongId,
  Token,
  UserId,
} from '@/types'
import { makeGetRequest, makePostRequest } from './axiosRequests'

function handleError(): never {
  throw new Error('An error occurred while fetching data from Spotify')
}

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

export function getUserProfileEndpoint() {
  return 'https://api.spotify.com/v1/me'
}

export function getCreatePlaylistEndpoint(id: UserId) {
  return `https://api.spotify.com/v1/users/${id}/playlists`
}

export function getSongUri({ songId }: { songId: SongId }) {
  return `spotify:track:${songId}`
}

export async function fetchSongs({
  tracksEndpoint,
  userToken,
}: {
  tracksEndpoint: string
  userToken: Token
}) {
  try {
    const playlistRes = await makeGetRequest(tracksEndpoint, {
      Authorization: `Bearer ${userToken}`,
    })
    return playlistRes
  } catch {
    handleError()
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
    await makePostRequest(addSongsEndpoint, addSongBody, addSongHeaders)
  } catch {
    handleError()
  }
}

export async function getUserId({ token }: { token: Token }) {
  try {
    const userProfileEndpoint = getUserProfileEndpoint()
    const userProfileRes = (await makeGetRequest(userProfileEndpoint, {
      Authorization: `Bearer ${token}`,
    })) as GetProfileRes
    return userProfileRes.id
  } catch {
    handleError()
  }
}

export async function createPlaylist({
  token,
  name,
  description,
}: {
  token: Token
  name: string
  description: string
}) {
  const userId = await getUserId({ token })
  const createPlaylistEndpoint = getCreatePlaylistEndpoint(userId)
  const createPlaylistBody = {
    name,
    description,
    public: false,
  }
  const createPlaylistHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  try {
    const createPlaylistRes = (await makePostRequest(
      createPlaylistEndpoint,
      createPlaylistBody,
      createPlaylistHeaders
    )) as Playlist
    return createPlaylistRes.id
  } catch {
    handleError()
  }
}
