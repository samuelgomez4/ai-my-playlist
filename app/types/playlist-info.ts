import type { playlists } from '@/utils/constants/playlists';

export type PlaylistsInfo = typeof playlists;
export type PlaylistInfo = PlaylistsInfo[number];

export type PlaylistBasicInfo = Pick<PlaylistInfo, 'id' | 'name' | 'image'>;
