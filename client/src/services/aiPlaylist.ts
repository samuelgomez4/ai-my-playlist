/* eslint-disable no-await-in-loop */
import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { ACTIONS, BACKEND_API_URL } from '@/constants'
import type {
  CreateFromSelected,
  FromSelected,
  GetPlaylistRes,
  AiPlaylistParams,
  SongsForAi,
} from '@/types'
import { fetchSongs } from './fetchSongs'
import { filterPlaylistItemsDataForAi } from './filterPlaylistItemsData'

// function getTracksUrls = ({ })
async function fromSelected({ token, tracksEndpoint }: FromSelected) {
  const response: AxiosResponse = await fetchSongs({
    tracksEndpoint,
    userToken: token,
  })
  const playlistRes: GetPlaylistRes = response.data
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

// async function createFromSelected({
//   prompt,
//   token,
//   tracksEndpoint,
//   createdPlaylistId,
// }: CreateFromSelected) {
//   const { songsIds, encryptedSongs } = await fromSelected({
//     token,
//     tracksEndpoint,
//   })

//   const response = await axios.post(`${BACKEND_API_URL}/create-from-selected`, {
//     prompt,
//     encryptedSongs,
//   })
//   const listOfEncryptedIds: string[] = response.data
// }
export function aiPlaylist({
  prompt,
  action,
  token,
  currentPlaylistId,
}: AiPlaylistParams) {
  // eslint-disable-next-line default-case
  switch (action) {
    case ACTIONS.createFromSelected:
      {
        const tracksEndpoint = `https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks?offset=0&limit=50`
        fromSelected({ token, tracksEndpoint }).then(
          ({ songsIds, encryptedSongs }) => {
            console.log(songsIds)
            console.log(encryptedSongs)
          }
        )
      }

      break
  }
}
