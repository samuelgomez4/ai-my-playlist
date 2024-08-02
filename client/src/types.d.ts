import type { ACTIONS, AI_ACTIONS } from './constants'
import type { useToken } from './hooks/useToken'
import type {
  filterPlaylistItemsDataForAi,
  filterPlaylistItemsDataToShow,
} from './services/filterPlaylistItemsData'
import type { filterPlaylistsData } from './services/filterPlaylistsData'

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
  items: Playlist[]
}

export interface Playlist {
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

export type PlaylistId = Playlist['id']

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

export type NextEndpoint = PlayListsRes['next']

export interface GetPlaylistRes {
  href: string
  items: PlaylistItem[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

export interface PlaylistItem {
  added_at: string
  added_by: Person
  is_local: boolean
  primary_color: null
  track: Track
  video_thumbnail: VideoThumbnail
}

export interface Person {
  external_urls: ExternalUrls
  href: string
  id: string
  type: PersonType
  uri: string
  name: string
}

export enum PersonType {
  Artist = 'artist',
  User = 'user',
}

export interface Track {
  preview_url: null | string
  available_markets: string[]
  explicit: boolean
  type: TrackType
  episode: boolean
  track: boolean
  album: Album
  artists: Person[]
  disc_number: number
  track_number: number
  duration_ms: number
  external_ids: ExternalIDS
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  popularity: number
  uri: string
  is_local: boolean
}

export type SongId = Track['id']

export interface Album {
  available_markets: string[]
  type: AlbumTypeEnum
  album_type: AlbumTypeEnum
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: ReleaseDatePrecision
  uri: string
  artists: Person[]
  external_urls: ExternalUrls
  total_tracks: number
}

export enum AlbumTypeEnum {
  Album = 'album',
  Single = 'single',
}

export enum ReleaseDatePrecision {
  Day = 'day',
}

export interface ExternalIDS {
  isrc: string
}

export enum TrackType {
  Track = 'track',
}

export interface VideoThumbnail {
  url: null
}

export type PlaylistsDetailsList = ReturnType<typeof filterPlaylistsData>
export type PlaylistDetails = PlaylistsDetailsList[number]
export type PlaylistItems = ReturnType<typeof filterPlaylistItemsDataToShow>
export type SongsForAi = ReturnType<typeof filterPlaylistItemsDataForAi>
export type Song = PlaylistItems[number]
export type Token = ReturnType<typeof useToken>

export type FromSratchAction = typeof ACTIONS.createFromScratch
export type FromSelectedAction = keyof Omit<typeof AI_ACTIONS, FromSratchAction>
export type AIAction = FromSratchAction | FromSelectedAction

export interface AiPlaylistFromScratch {
  prompt: string
  action: FromSratchAction
  token: Token
  currentPlaylistId: PlaylistId | undefined
}
export interface AiPlaylistFromSelected {
  prompt: string
  action: FromSelectedAction
  token: Token
  currentPlaylistId: PlaylistId
}
export type AiPlaylistParams = AiPlaylistFromScratch | AiPlaylistFromSelected

export interface FromSelectedParams {
  token: Token
  tracksEndpoint: string
}
export interface CreateFromSelectedParams extends FromSelectedParams {
  prompt: string
}

export type ListOfIds = `${SongId}`[]
export type ListOfEncryptedIds = `${number}`[]

export type SongsUrisToAdd = `spotify:track:${SongId}`[]
export interface AddSongsParams {
  token: Token
  playlistId: PlaylistId
  songsUrisToAdd: SongsUrisToAdd
}

export type NameAndDescription = {
  name: string
  description: string
}

export interface GetProfileRes {
  display_name: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  type: string
  uri: string
  followers: Followers
  country: string
  product: string
  explicit_content: ExplicitContent
  email: string
}

export interface ExplicitContent {
  filter_enabled: boolean
  filter_locked: boolean
}

export interface Followers {
  href: null
  total: number
}

export type UserId = GetProfileRes['id']

export interface AIResponse {
  text: string
}
