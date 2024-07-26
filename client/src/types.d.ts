export interface TokenReqBody {
  authCode: string
  authState: string | null
}

export interface TokenRes {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface PlayListsRes {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: Item[]
}

export interface Item {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  primary_color: null | string
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: 'playlist'
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Image {
  height: number | null
  url: string
  width: number | null
}

export interface Owner {
  display_name: string
  external_urls: ExternalUrls
  href: string
  id: string
  type: 'user'
  uri: string
}

export interface Tracks {
  href: string
  total: number
}

export interface PlayListsItemsError {
  error: Error
}

export type HasNext = Pick<PlayListsRes, 'next'>
