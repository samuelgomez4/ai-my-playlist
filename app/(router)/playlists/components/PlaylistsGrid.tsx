'use client';
import type { PlaylistInfo } from '@/types/playlist';
import { SmallPlaylistCard } from './SmallPlaylistCard';
import { SmallPlaylistCardSkeleton } from './SmallPlaylistCardSkeleton';

type Props = {
  playlists: PlaylistInfo[];
  isLoading: boolean;
};

export function PlaylistsGrid({ playlists, isLoading }: Props) {
  return (
    <>
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => <SmallPlaylistCardSkeleton key={index} />)
        : playlists.map((playlist) => (
            <SmallPlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
    </>
  );
}
