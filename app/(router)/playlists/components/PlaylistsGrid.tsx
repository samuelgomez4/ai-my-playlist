'use client';
import type { PlaylistInfo } from '@/types/playlist';
import { SmallPlaylistCard } from './SmallPlaylistCard';

type Props = {
  playlists: PlaylistInfo[];
};

export function PlaylistsGrid({ playlists }: Props) {
  return (
    <>
      {playlists.map((playlist) => (
        <SmallPlaylistCard
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </>
  );
}
