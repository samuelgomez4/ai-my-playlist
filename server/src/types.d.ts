export type TokenBody = {
  authCode: string
  authState: string | null
}

export type RefreshBody = {
  refreshToken: string
}

type SongsForAi = {
  id: string
  name: string
  artists: {
    name: string | undefined
  }[]
  album: {
    name: string
  }
  duration: string
  releaseDate: string
  addedByUserAt: string
}[]

export type SongsForAiString = `${SongsForAi}`

export interface GetNameAndDescriptionReq {
  prompt: string
}

export interface GetSongsFromSelectedReq extends GetNameAndDescriptionReq {
  encryptedSongs: SongsForAiString
}

export interface GetQueriesReq extends GetNameAndDescriptionReq {
  encryptedSongs: SongsForAiString | ''
}

export type NameAndDescription = {
  name: string
  description: string
}

export type ListOfEncryptedIds = `${number}`[]
