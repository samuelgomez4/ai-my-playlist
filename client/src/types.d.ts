import type { filterPlaylistItemsData } from './services/filterPlaylistItemsData'
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
  added_at: Date
  added_by: AddedBy
  is_local: boolean
  primary_color: null
  track: Track
  video_thumbnail: VideoThumbnail
}

export interface AddedBy {
  external_urls: ExternalUrls
  href: string
  id: string
  type: AddedByType
  uri: string
  name?: string
}

export enum AddedByType {
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
  artists: AddedBy[]
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

export interface Album {
  available_markets: string[]
  type: AlbumTypeEnum
  album_type: AlbumTypeEnum
  href: string
  id: string
  images: Image[]
  name: string
  release_date: Date
  release_date_precision: ReleaseDatePrecision
  uri: string
  artists: AddedBy[]
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

export type Playlists = ReturnType<typeof filterPlaylistsData>
export type Playlist = Playlists[number]
export type PlaylistItems = ReturnType<typeof filterPlaylistItemsData>
