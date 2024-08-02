/* eslint-disable no-await-in-loop */
import plimit from 'p-limit'
import { ACTIONS } from '@/constants'
import type {
  CreateFromSelectedParams,
  FromSelectedParams,
  GetPlaylistRes,
  AiPlaylistParams,
  SongsForAi,
  SongsUrisToAdd,
  ListOfIds,
  CreateFromScratchParams,
} from '@/types'
import {
  addSongs,
  createPlaylist,
  fetchSongs,
  getSongUri,
  getTracksEndpoint,
  getUserId,
  searchSong,
} from './spotifyAPI'
import { filterPlaylistItemsDataForAi } from './filterPlaylistItemsData'
import {
  createPlaylistNameAndDescription,
  getSongsQueriesToAdd,
  getSongsToAddFromSelected,
} from './backendAPI'

const concurrencyLimit = 5
const limit = plimit(concurrencyLimit)

async function createPlaylistWithAI({
  prompt,
  token,
}: CreateFromScratchParams) {
  const [{ name, description }, userId] = await Promise.all([
    createPlaylistNameAndDescription({ prompt }),
    getUserId({ token }),
  ])
  const createdPlaylistId = await createPlaylist({
    token,
    userId,
    name,
    description,
  })
  return createdPlaylistId
}

async function createFromScratch({ prompt, token }: CreateFromScratchParams) {
  const [playlistId, songsQueries] = await Promise.all([
    createPlaylistWithAI({ prompt, token }),
    getSongsQueriesToAdd({ prompt }),
  ])
  const songsToaddPromises = songsQueries.map((query) =>
    limit(() => searchSong({ query, token }))
  )
  const songsToAdd = await Promise.all(songsToaddPromises)
  const songsUrisToAdd = songsToAdd.map(
    (song) => song.tracks.items[0].uri
  ) as SongsUrisToAdd
  await addSongs({ token, playlistId, songsUrisToAdd })
}

async function fromSelected({ token, tracksEndpoint }: FromSelectedParams) {
  const playlistRes: GetPlaylistRes = await fetchSongs({
    tracksEndpoint,
    userToken: token,
  })
  const playlistsItems = filterPlaylistItemsDataForAi(playlistRes)
  const songsIds: ListOfIds = []
  const encryptedSongs: SongsForAi = []
  // encrypt ids to avoid sending spotify ids to AI model
  playlistsItems.forEach((song, index) => {
    songsIds.push(song[0] as string)
    // eslint-disable-next-line no-param-reassign
    song[0] = String(index)
    encryptedSongs.push(song)
  })
  return { songsIds, encryptedSongs }
}

async function createPlaylistFromSelection({
  prompt,
  token,
  tracksEndpoint,
}: CreateFromSelectedParams) {
  const [playlistId, { songsIds, encryptedSongs }] = await Promise.all([
    createPlaylistWithAI({ prompt, token }),
    fromSelected({ token, tracksEndpoint }),
  ])
  const listOfEncryptedIdsToAdd = await getSongsToAddFromSelected({
    prompt,
    encryptedSongs,
  })
  const songsUrisToAdd = listOfEncryptedIdsToAdd.map((encryptedId) => {
    const songId = songsIds[encryptedId]
    return getSongUri({ songId })
  }) as SongsUrisToAdd
  await addSongs({ token, playlistId, songsUrisToAdd })
}

export function aiPlaylist({
  prompt,
  action,
  token,
  currentPlaylistId,
}: AiPlaylistParams) {
  // eslint-disable-next-line default-case
  switch (action) {
    case ACTIONS.createFromScratch: {
      return createFromScratch({ prompt, token })
    }
    case ACTIONS.createFromSelected: {
      const tracksEndpoint = getTracksEndpoint({
        playlistId: currentPlaylistId,
        limit: '100',
      })
      return createPlaylistFromSelection({ prompt, token, tracksEndpoint })
    }
  }
}
