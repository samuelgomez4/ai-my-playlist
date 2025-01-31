'use client';
import { SmallPlaylistCard } from './SmallPlaylistCard';
import { usePlaylists } from '@/hooks/usePlaylists';

export function PlaylistsGrid() {
  const playlists = usePlaylists();
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
