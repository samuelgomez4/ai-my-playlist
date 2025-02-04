'use client';
import { CancelButton } from '@/components/ui/CancelButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { Id } from '@/types/playlist';
import { useRouter } from 'next/navigation';

export function PlaylistHeader({ id }: { id: Id }) {
  const { playlists } = usePlaylists();
  const currentPlaylistInfo = playlists[id];
  const router = useRouter();
  return (
    <header className="grid grid-cols-[minmax(96px,1fr),6fr,1fr] sm:grid-cols-[minmax(192px,2fr),6fr,1fr] gap-6 mb-12 ">
      <img
        src={currentPlaylistInfo?.songs[0].image ?? ''}
        alt={currentPlaylistInfo?.name ?? ''}
        className={`w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-lg sm:row-span-2`}
      />
      <div className="overflow-hidden sm:self-start self-center">
        <h2
          className={`text-3xl sm:text-6xl font-bold text-white pb-4 text-nowrap overflow-hidden text-ellipsis`}>
          {currentPlaylistInfo?.name}
        </h2>
        <p className="text-gray-400 overflow-hidden text-nowrap text-ellipsis">
          <span>{currentPlaylistInfo?.songs.length ?? 0} songs </span>
          <span>• </span>
          <span className="max-w-prose">{currentPlaylistInfo?.description}</span>
        </p>
      </div>
      <CancelButton
        onClick={() => router.back()}
        className="justify-self-end self-start"
      />
      <SearchBar
        placeholder="Search in playlist..."
        className="col-start-1 col-end-4 sm:col-start-2 sm:col-end-4 self-center"
      />
    </header>
  );
}
