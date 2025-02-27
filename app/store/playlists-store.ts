import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { Id, PlaylistsInfo, Songs } from '@/types/playlist';
import { playlistsSample } from '@/utils/constants/playlistsSample';

export interface State {
  playlists: PlaylistsInfo;
  createPlaylist: ({ name, description }: { name: string; description: string }) => string;
  deletePlaylist: (id: Id) => void;
  addSongsToPlaylist: (playlistId: Id, songs: Songs) => void;
  deleteSongsFromPlaylist: (playlistId: Id, songIds: Id[]) => void;
}

export const usePlaylistsStore = create<State>()(
  persist(
    (set) => ({
      playlists: playlistsSample,
      createPlaylist: ({ name, description }) => {
        const id = crypto.randomUUID();
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
        return id;
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
