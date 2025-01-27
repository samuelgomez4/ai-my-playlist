import { SmallPlaylistCard } from './components/SmallPlaylistCard';
import { Link } from 'next-view-transitions';
import { SearchBar } from '@/components/ui/SearchBar';
import { playlists } from '@/utils/constants/playlists';
import { CreatePlaylistCard } from '@/components/playlist/CreatePlaylistCard';

export default function PlaylistsPage() {
  return (
    <section className="mb-8 px-4">
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-10 [view-transition-name:your-playlists-title]">
        Your Playlists
      </h2>
      <Link
        href={'./'}
        className="text-white">
        Go to prompt input
      </Link>
      <SearchBar placeholder="Search playlists..." />
      <div className="grid py-12 px-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 justify-items-center">
        {playlists.map((playlist) => (
          <SmallPlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        ))}
        <CreatePlaylistCard className="w-full max-w-[350px] min-h-32" />
      </div>
    </section>
  );
}
