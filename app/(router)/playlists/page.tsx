'use client';
import { SearchBar } from '@/components/ui/SearchBar';
import { CreatePlaylistCard } from '@/components/playlist/CreatePlaylistCard';
import { PlaylistsGrid } from './components/PlaylistsGrid';
import { CancelButton } from '@/components/ui/CancelButton';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRouter } from 'next/navigation';

export default function PlaylistsPage() {
  const router = useRouter();
  const [animationParent] = useAutoAnimate();
  return (
    <section className="mb-8 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">Your Playlists</h2>
        <CancelButton onClick={() => router.back()} />
      </div>
      <SearchBar placeholder="Search playlists..." />
      <div
        ref={animationParent}
        className="grid py-12 px-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 justify-items-center">
        <PlaylistsGrid />
        <CreatePlaylistCard className="w-full max-w-[350px] min-h-32" />
      </div>
    </section>
  );
}
