'use client';
import { usePlaylistsStore } from '@/store/playlists';
import { SmallPlaylistCard } from './SmallPlaylistCard';

export function PlaylistsGrid() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  return (
    <>
      {Object.values(playlists).map((playlist) => (
        <SmallPlaylistCard
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </>
  );
}
