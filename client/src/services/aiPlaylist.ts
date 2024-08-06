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
  AddSongsToSelectedParams,
  CreateFromScratchParams,
  RemoveSongsParams,
  SongsUrisToRemove,
} from '@/types'
import {
  addSongs,
  createPlaylist,
  fetchSongs,
  getAllTracksEndpoints,
  getSongUri,
  getUserId,
  removeSongs,
  searchSong,
} from './spotifyAPI'
import { filterPlaylistItemsDataForAi } from './filterPlaylistItemsData'
import { createNameAndDescription } from './vercel-ai-sdk/createNameAndDescription'
import { respondWithQueriesToAdd } from './vercel-ai-sdk/respondWithQueriesToAdd'
import { respondWithIdsToAdd } from './vercel-ai-sdk/respondWithIdsToAdd'
import { respondWithIdsToRemove } from './vercel-ai-sdk/respondWithIdsToRemove'

const concurrencyLimit = 5
const limit = plimit(concurrencyLimit)

async function createPlaylistWithAI({
  prompt,
  token,
  apiKey,
}: CreateFromScratchParams) {
  const [{ name, description }, userId] = await Promise.all([
    createNameAndDescription({ prompt, apiKey }),
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

async function createFromScratch({
  prompt,
  token,
  apiKey,
}: CreateFromScratchParams) {
  const [playlistId, songsQueries] = await Promise.all([
    createPlaylistWithAI({ prompt, token, apiKey }),
    respondWithQueriesToAdd({ prompt, apiKey }),
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

async function fromSelected({ token, tracksEndpoints }: FromSelectedParams) {
  const playlistResPromises = tracksEndpoints.map((tracksEndpoint) =>
    limit(() => fetchSongs({ tracksEndpoint, userToken: token }))
  )
  const playlistResponses = (await Promise.all(
    playlistResPromises
  )) as GetPlaylistRes[]

  const playlistsItems = playlistResponses.flatMap((playlistRes) =>
    filterPlaylistItemsDataForAi(playlistRes)
  )
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
  tracksEndpoints,
  apiKey,
}: CreateFromSelectedParams) {
  const [playlistId, { songsIds, encryptedSongs }] = await Promise.all([
    createPlaylistWithAI({ prompt, token, apiKey }),
    fromSelected({ token, tracksEndpoints }),
  ])
  const listOfEncryptedIdsToAdd = await respondWithIdsToAdd({
    prompt,
    encryptedSongs: JSON.stringify(encryptedSongs),
    apiKey,
  })
  const songsUrisToAdd = listOfEncryptedIdsToAdd.map((encryptedId) => {
    const songId = songsIds[encryptedId]
    return getSongUri({ songId })
  }) as SongsUrisToAdd
  await addSongs({ token, playlistId, songsUrisToAdd })
}
async function createPlaylistWithNewSongs({
  prompt,
  token,
  tracksEndpoints,
  apiKey,
}: CreateFromSelectedParams) {
  const [playlistId, { encryptedSongs }] = await Promise.all([
    createPlaylistWithAI({ prompt, token, apiKey }),
    fromSelected({ token, tracksEndpoints }),
  ])
  const songsQueries = await respondWithQueriesToAdd({
    prompt,
    apiKey,
    encryptedSongs: JSON.stringify(encryptedSongs),
  })
  const songsToaddPromises = songsQueries.map((query) =>
    limit(() => searchSong({ query, token }))
  )
  const songsToAdd = await Promise.all(songsToaddPromises)
  const songsUrisToAdd = songsToAdd.map(
    (song) => song.tracks.items[0].uri
  ) as SongsUrisToAdd
  await addSongs({ token, playlistId, songsUrisToAdd })
}

async function addNewSongsToSelected({
  currentPlaylistDetails,
  prompt,
  token,
  tracksEndpoints,
  apiKey,
}: AddSongsToSelectedParams) {
  const { encryptedSongs } = await fromSelected({ token, tracksEndpoints })
  const songsQueries = await respondWithQueriesToAdd({
    prompt,
    apiKey,
    encryptedSongs: JSON.stringify(encryptedSongs),
  })
  const songsToaddPromises = songsQueries.map((query) =>
    limit(() => searchSong({ query, token }))
  )
  const songsToAdd = await Promise.all(songsToaddPromises)
  const songsUrisToAdd = songsToAdd.map(
    (song) => song.tracks.items[0].uri
  ) as SongsUrisToAdd
  await addSongs({
    token,
    playlistId: currentPlaylistDetails.id,
    songsUrisToAdd,
  })
}

async function removeSongsFromSelected({
  currentPlaylistDetails,
  prompt,
  token,
  tracksEndpoints,
  apiKey,
}: RemoveSongsParams) {
  const { songsIds, encryptedSongs } = await fromSelected({
    token,
    tracksEndpoints,
  })
  const listOfEncryptedIdsToRemove = await respondWithIdsToRemove({
    prompt,
    encryptedSongs: JSON.stringify(encryptedSongs),
    apiKey,
  })
  const songsUrisToRemove = listOfEncryptedIdsToRemove.map((encryptedId) => {
    const songId = songsIds[encryptedId]
    return { uri: getSongUri({ songId }) }
  }) as SongsUrisToRemove
  await removeSongs({
    token,
    playlistId: currentPlaylistDetails.id,
    songsUrisToRemove,
  })
}

export function aiPlaylist({
  prompt,
  action,
  token,
  currentPlaylistDetails,
  apiKey,
}: AiPlaylistParams) {
  if (ACTIONS.createFromScratch === action) {
    return createFromScratch({ prompt, token, apiKey })
  }
  if (!currentPlaylistDetails) return
  const tracksEndpoints = getAllTracksEndpoints({
    playlistId: currentPlaylistDetails.id,
    numberOfTracks: currentPlaylistDetails.numberTracks,
  })
  if (ACTIONS.createFromSelected === action) {
    return createPlaylistFromSelection({
      prompt,
      token,
      tracksEndpoints,
      apiKey,
    })
  }
  if (ACTIONS.createNewSongsFromSelected === action) {
    return createPlaylistWithNewSongs({
      prompt,
      token,
      tracksEndpoints,
      apiKey,
    })
  }
  if (ACTIONS.addToSelected === action) {
    return addNewSongsToSelected({
      currentPlaylistDetails,
      prompt,
      token,
      tracksEndpoints,
      apiKey,
    })
  }
  if (ACTIONS.removeFromSelected === action) {
    return removeSongsFromSelected({
      currentPlaylistDetails,
      prompt,
      token,
      tracksEndpoints,
      apiKey,
    })
  }
}
