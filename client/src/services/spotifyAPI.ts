import type {
  AddSongsParams,
  GetProfileRes,
  Playlist,
  PlaylistId,
  PlayListsRes,
  RemoveParams,
  SearchRes,
  SongId,
  Token,
  UserId,
} from '@/types'
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
} from './axiosRequests'

function handleError(message: string): never {
  throw new Error(message)
}

export function getPlaylistsEndpoint({
  offset = '0',
  limit = '10',
}: {
  offset?: string
  limit?: string
}) {
  return `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`
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

export function getAllTracksEndpoints({
  playlistId,
  numberOfTracks,
}: {
  playlistId: PlaylistId
  numberOfTracks: number
}) {
  const tracksEndpoints = []
  for (let i = 0; i < numberOfTracks; i += 100) {
    tracksEndpoints.push(
      getTracksEndpoint({
        playlistId,
        offset: i.toString(),
        limit: '100',
      })
    )
  }
  return tracksEndpoints
}

export function getAddSongsEndpoint({
  playlistId,
}: {
  playlistId: PlaylistId
}) {
  return `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
}

export const getRemoveSongsEndpoint = getAddSongsEndpoint

export function getUserProfileEndpoint() {
  return 'https://api.spotify.com/v1/me'
}

export function getCreatePlaylistEndpoint(id: UserId) {
  return `https://api.spotify.com/v1/users/${id}/playlists`
}

export function getSearchEndpoint({ query }: { query: string }) {
  const queryParams = {
    q: query,
    type: 'track',
    limit: '1',
  }
  const searchParams = new URLSearchParams(queryParams)
  const queryParamsString = searchParams.toString()
  return `https://api.spotify.com/v1/search?${queryParamsString}`
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
    handleError('An error occurred while fetching songs')
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
    handleError('An error occurred while adding songs to the playlist')
  }
}

export async function removeSongs({
  token,
  playlistId,
  songsUrisToRemove,
}: RemoveParams) {
  const removeSongsEndpoint = getRemoveSongsEndpoint({ playlistId })
  const removeSongBody = {
    tracks: songsUrisToRemove,
  }
  const removeSongHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  try {
    await makeDeleteRequest(
      removeSongsEndpoint,
      removeSongBody,
      removeSongHeaders
    )
  } catch (error) {
    handleError('An error occurred while removing songs from the playlist')
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
    handleError('An error occurred while fetching user profile')
  }
}

export async function createPlaylist({
  token,
  userId,
  name,
  description,
}: {
  token: Token
  userId: UserId
  name: string
  description: string
}) {
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
    handleError('An error occurred while creating the playlist')
  }
}

export async function searchSong({
  query,
  token,
}: {
  query: string
  token: Token
}) {
  const searchEndpoint = getSearchEndpoint({ query })
  try {
    const searchRes = (await makeGetRequest(searchEndpoint, {
      Authorization: `Bearer ${token}`,
    })) as SearchRes
    return searchRes
  } catch {
    handleError('An error occurred while searching for the songs')
  }
}

export async function fetchPlaylists({
  token,
  playlistsUrl,
}: {
  token: Token
  playlistsUrl: string
}) {
  try {
    const playlistsRes = (await makeGetRequest(playlistsUrl, {
      Authorization: `Bearer ${token}`,
    })) as PlayListsRes
    return playlistsRes
  } catch {
    handleError('An error occurred while fetching playlists')
  }
}
