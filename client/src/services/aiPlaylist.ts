/* eslint-disable no-await-in-loop */
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { ACTIONS, BACKEND_API_URL } from '@/constants'
import type {
  CreateFromSelectedParams,
  FromSelectedParams,
  GetPlaylistRes,
  AiPlaylistParams,
  SongsForAi,
  ListOfEncryptedIds,
  SongsUrisToAdd,
  SongId,
} from '@/types'
import { addSongs, fetchSongs, getTracksEndpoint } from './spotifyAPI'
import { filterPlaylistItemsDataForAi } from './filterPlaylistItemsData'

// function getTracksUrls = ({ })
async function fromSelected({ token, tracksEndpoint }: FromSelectedParams) {
  const playlistRes: GetPlaylistRes = await fetchSongs({
    tracksEndpoint,
    userToken: token,
  })
  const { next } = playlistRes
  const playlistsItems = filterPlaylistItemsDataForAi(playlistRes)
  const songsIds: string[] = []
  const encryptedSongs: SongsForAi = []
  // encrypt ids to avoid sending spotify ids to AI model
  playlistsItems.forEach((song, index) => {
    songsIds.push(song.id)
    encryptedSongs.push({ ...song, id: String(index) })
  })
  return { next, songsIds, encryptedSongs }
}

async function createFromSelected({
  prompt,
  token,
  tracksEndpoint,
  playlistId,
}: CreateFromSelectedParams) {
  const { songsIds, encryptedSongs } = await fromSelected({
    token,
    tracksEndpoint,
  })
  const response = await axios.post(`${BACKEND_API_URL}/create-from-selected`, {
    prompt,
    encryptedSongs,
  })
  const listOfEncryptedIds = response.data as ListOfEncryptedIds
  const songsUrisToAdd = listOfEncryptedIds.map((encryptedId) => {
    const songId = songsIds[encryptedId]
    return `spotify:track:${songId}`
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
        limit: '20',
      })
      fromSelected({ token, tracksEndpoint }).then(({ encryptedSongs }) =>
        console.log(encryptedSongs)
      )
      break
    }
  }
}
