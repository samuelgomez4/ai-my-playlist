import { ScrollArea } from '@radix-ui/react-scroll-area'
import { PlaylistCard } from './PlaylistCard'
import { useInitialPlaylistDetails } from '@/hooks/useInitialPlaylistId'
import type { PlaylistDetails, PlaylistsDetailsList } from '@/types'

interface Props {
  playlists: PlaylistsDetailsList | null
  currentPlaylistDetails: PlaylistDetails | null
  updateCurrentPlaylistDetails: (details: PlaylistDetails) => void
}

export function PlaylistsSection({
  playlists,
  currentPlaylistDetails,
  updateCurrentPlaylistDetails,
}: Props) {
  // TODO display error, loading, etc. lazyloading playlists. Render something when user has no playlists
  useInitialPlaylistDetails(playlists, updateCurrentPlaylistDetails)
  return (
    <ScrollArea className="h-72">
      <ul className="flex flex-col gap-4">
        {playlists &&
          playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                className="w-full"
                type="button"
                aria-label={`Select playlist ${playlist.name}`}
                onClick={() => {
                  updateCurrentPlaylistDetails(playlist)
                }}>
                <PlaylistCard
                  playlist={playlist}
                  isActive={playlist.id === currentPlaylistDetails?.id}
                />
              </button>
            </li>
          ))}
      </ul>
    </ScrollArea>
  )
}
