import { create } from 'zustand';

export interface State {
  query: string;
  setQuery: (query: string) => void;
}

export const useSongQuerytStore = create<State>()((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));
