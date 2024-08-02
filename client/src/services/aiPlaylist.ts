/* eslint-disable no-await-in-loop */
import { ACTIONS } from '@/constants'
import type {
  CreateFromSelectedParams,
  FromSelectedParams,
  GetPlaylistRes,
  AiPlaylistParams,
  SongsForAi,
  SongsUrisToAdd,
  ListOfIds,
} from '@/types'
import {
  addSongs,
  createPlaylist,
  fetchSongs,
  getSongUri,
  getTracksEndpoint,
} from './spotifyAPI'
import { filterPlaylistItemsDataForAi } from './filterPlaylistItemsData'
import {
  createPlaylistNameAndDescription,
  getSongsToAddFromSelected,
} from './backendAPI'

// function getTracksUrls = ({ })
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
    songsIds.push(song.id)
    encryptedSongs.push({ ...song, id: String(index) })
  })
  return { songsIds, encryptedSongs }
}

async function createPlaylistFromSelection({
  prompt,
  token,
  tracksEndpoint,
}: CreateFromSelectedParams) {
  const nameAndDescription = await createPlaylistNameAndDescription({
    prompt,
  })
  const { name, description } = nameAndDescription
  const playlistId = await createPlaylist({ token, name, description })
  const { songsIds, encryptedSongs } = await fromSelected({
    token,
    tracksEndpoint,
  })
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
    case ACTIONS.createFromSelected: {
      const tracksEndpoint = getTracksEndpoint({
        playlistId: currentPlaylistId,
        limit: '100',
      })
      return createPlaylistFromSelection({ prompt, token, tracksEndpoint })
    }
  }
}
