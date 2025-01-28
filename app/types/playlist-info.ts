import type { playlists } from '@/utils/constants/playlists';

export type PlaylistsInfo = typeof playlists;
export type PlaylistInfo = PlaylistsInfo[keyof PlaylistsInfo];

export type PlaylistBasicInfo = Pick<PlaylistInfo, 'id' | 'name' | 'image'>;
