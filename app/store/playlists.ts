import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { Id, PlaylistsInfo, Songs } from '@/types/playlist';
import { playlists } from '@/utils/constants/playlists';
import { randomUUID } from 'crypto';

export interface State {
  playlists: PlaylistsInfo;
  createPlaylist: (name: string, description: string) => void;
  deletePlaylist: (id: Id) => void;
  addSongsToPlaylist: (playlistId: Id, songs: Songs) => void;
  deleteSongsFromPlaylist: (playlistId: Id, songIds: Id[]) => void;
}

export const usePlaylistsStore = create<State>()(
  persist(
    (set) => ({
      playlists: playlists,
      createPlaylist: (name, description) => {
        const id = randomUUID();
        set((state) => ({
          playlists: {
            ...state.playlists,
            [id]: {
              id,
              name,
              description,
              songs: [],
            },
          },
        }));
      },
      deletePlaylist: (id) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = state.playlists;
          return { playlists: rest };
        });
      },
      addSongsToPlaylist: (playlistId, songs) => {
        set((state) => ({
          playlists: {
            ...state.playlists,
            [playlistId]: {
              ...state.playlists[playlistId],
              songs: [...state.playlists[playlistId].songs, ...songs],
            },
          },
        }));
      },
      deleteSongsFromPlaylist: (playlistId, songIds) => {
        set((state) => ({
          playlists: {
            ...state.playlists,
            [playlistId]: {
              ...state.playlists[playlistId],
              songs: state.playlists[playlistId].songs.filter((song) => !songIds.includes(song.id)),
            },
          },
        }));
      },
    }),
    { name: 'playlists', skipHydration: true }
  )
);
