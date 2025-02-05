'use client';
import { CancelButton } from '@/components/ui/CancelButton';
import { CustomImage } from '@/components/ui/CustomImage';
import { SearchBar } from '@/components/ui/SearchBar';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useSongQuerytStore } from '@/store/song-query-store';
import type { Id } from '@/types/playlist';
import { notFound, useRouter } from 'next/navigation';

export function PlaylistHeader({ id }: { id: Id }) {
  const { playlists, isLoading } = usePlaylists();
  const currentPlaylistInfo = playlists[id];
  if (!currentPlaylistInfo && !isLoading) notFound();
  const { query, setQuery } = useSongQuerytStore();
  const router = useRouter();

  if (isLoading) {
    return (
      <header className="grid grid-cols-[96px,6fr,1fr] sm:grid-cols-[192px,6fr,1fr] gap-6 mb-12 ">
        <div className="w-24 h-24 sm:w-48 sm:h-48 bg-gray-300 animate-pulse rounded-lg sm:row-span-2" />
        <div className="overflow-hidden sm:self-start self-center">
          <div className="h-8 sm:h-12 bg-gray-300 animate-pulse rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2" />
        </div>
        <div className="col-start-1 col-end-4 sm:col-start-2 sm:col-end-4 self-center h-10 bg-gray-300 animate-pulse rounded" />
      </header>
    );
  }

  return (
    <header className="grid grid-cols-[96px,6fr,1fr] sm:grid-cols-[192px,6fr,1fr] gap-6 mb-12 ">
      <CustomImage
        src={currentPlaylistInfo?.songs[0]?.image}
        alt={currentPlaylistInfo?.name ?? ''}
        className={`w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-lg sm:row-span-2`}
      />
      <div className="overflow-hidden sm:self-start self-center">
        <h2
          title={`${currentPlaylistInfo?.name}`}
          className={`text-3xl sm:text-6xl font-bold text-white pb-4 text-nowrap overflow-hidden text-ellipsis`}>
          {currentPlaylistInfo?.name}
        </h2>
        <p className="text-gray-400 overflow-hidden text-nowrap text-ellipsis">
          <span>{currentPlaylistInfo?.songs.length ?? 0} songs </span>
          <span>• </span>
          <span
            title={currentPlaylistInfo?.description}
            className="max-w-prose">
            {currentPlaylistInfo?.description}
          </span>
        </p>
      </div>
      <CancelButton
        onClick={() => router.back()}
        className="justify-self-end self-start"
      />
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search in playlist..."
        className="col-start-1 col-end-4 sm:col-start-2 sm:col-end-4 self-center"
      />
    </header>
  );
}
