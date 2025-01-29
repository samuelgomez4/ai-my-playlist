import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { PlaylistBasicInfo } from '@/types/playlist';

export interface State {
  selectedPlaylist: PlaylistBasicInfo | undefined;
  setSelectedPlaylist: (playlist: PlaylistBasicInfo | undefined) => void;
}

export const useSelectedPlaylistStore = create<State>()(
  persist(
    (set) => ({
      selectedPlaylist: undefined,
      setSelectedPlaylist: (playlist) => set({ selectedPlaylist: playlist }),
    }),
    { name: 'selected-playlist', skipHydration: true }
  )
);
