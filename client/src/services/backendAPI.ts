import { BACKEND_API_URL } from '@/constants'
import type {
  ListOfEncryptedIds,
  NameAndDescription,
  SongsForAi,
} from '@/types'
import { makePostRequest } from './axiosRequests'

export async function createPlaylistNameAndDescription({
  prompt,
}: {
  prompt: string
}) {
  const nameResponse = (await makePostRequest(
    `${BACKEND_API_URL}/name-and-description`,
    {
      prompt,
    }
  )) as NameAndDescription
  return nameResponse
}

export async function getSongsQueriesToAdd({
  prompt,
  encryptedSongs = '',
}: {
  prompt: string
  encryptedSongs?: SongsForAi | ''
}) {
  const songsQueries = (await makePostRequest(
    `${BACKEND_API_URL}/get-songs-queries`,
    {
      prompt,
      encryptedSongs,
    }
  )) as string[]
  return songsQueries
}

export async function getSongsToAddFromSelected({
  prompt,
  encryptedSongs,
}: {
  prompt: string
  encryptedSongs: SongsForAi
}) {
  const listOfEncryptedIdsToAdd = (await makePostRequest(
    `${BACKEND_API_URL}/get-songs-from-selected`,
    {
      prompt,
      encryptedSongs,
    }
  )) as ListOfEncryptedIds
  return listOfEncryptedIdsToAdd
}
