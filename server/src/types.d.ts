export type QueryParams = {
  response_type: string
  client_id: string
  scope: string
  redirect_uri: string
  state: string
}

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
