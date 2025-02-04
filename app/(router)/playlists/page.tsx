'use client';
import { SearchBar } from '@/components/ui/SearchBar';
import { CreatePlaylistCard } from '@/components/playlist/CreatePlaylistCard';
import { PlaylistsGrid } from './components/PlaylistsGrid';
import { CancelButton } from '@/components/ui/CancelButton';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRouter } from 'next/navigation';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useState } from 'react';

export default function PlaylistsPage() {
  const [query, setQuery] = useState('');
  const { filteredPlaylists } = usePlaylists(query);
  const router = useRouter();
  const [animationParent] = useAutoAnimate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };
  return (
    <section className="mb-8 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">Your Playlists</h2>
        <CancelButton onClick={() => router.back()} />
      </div>
      <SearchBar
        placeholder="Search playlists..."
        value={query}
        onChange={handleChange}
      />
      <div
        ref={animationParent}
        className="grid py-12 px-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 justify-items-center">
        <PlaylistsGrid playlists={filteredPlaylists} />
        <CreatePlaylistCard className="w-full max-w-[350px] min-h-32" />
      </div>
    </section>
  );
}
