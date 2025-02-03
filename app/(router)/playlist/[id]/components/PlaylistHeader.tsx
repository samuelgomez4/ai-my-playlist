'use client';
import { CancelButton } from '@/components/ui/CancelButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { Id } from '@/types/playlist';
import { useTransitionRouter } from 'next-view-transitions';

export function PlaylistHeader({ id }: { id: Id }) {
  const playlists = usePlaylists();
  const currentPlaylistInfo = playlists[id];
  const router = useTransitionRouter();
  return (
    <header className="flex gap-6 mb-12">
      <img
        src={currentPlaylistInfo?.songs[0].image ?? ''}
        alt={currentPlaylistInfo?.name ?? ''}
        className={`w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-lg`}
      />
      <div className="grid grid-cols-[10fr,1fr] gap-6 flex-1">
        <div className="overflow-hidden self-center">
          <h2
            className={`text-3xl sm:text-6xl font-bold text-white pb-4 text-nowrap overflow-hidden text-ellipsis`}>
            {currentPlaylistInfo?.name}
          </h2>
          <p className="text-gray-400">
            <span>{currentPlaylistInfo?.songs.length ?? 0} songs </span>
            <span>• </span>
            <span>{currentPlaylistInfo?.description}</span>
          </p>
        </div>
        <CancelButton
          onClick={() => router.push('/')}
          className="justify-self-end self-start"
        />
        <SearchBar
          placeholder="Search in playlist..."
          className="col-start-1 col-end-3 self-center"
        />
      </div>
    </header>
  );
}
