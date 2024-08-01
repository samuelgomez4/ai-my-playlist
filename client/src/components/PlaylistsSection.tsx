import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'
import { usePlaylists } from '@/hooks/usePlaylists'
import { PlaylistCard } from './PlaylistCard'
import { useInitialPlaylistDetails } from '@/hooks/useInitialPlaylistId'
import type { PlaylistDetails, Token } from '@/types'

interface Props {
  token: Token
  currentPlaylistDetails: PlaylistDetails | null
  updateCurrentPlaylistDetails: (details: PlaylistDetails) => void
}

export function PlaylistsSection({
  token,
  currentPlaylistDetails,
  updateCurrentPlaylistDetails,
}: Props) {
  // TODO display error, loading, etc. lazyloading playlists. Render something when user has no playlists
  const { playlists, error, isLoading, hasNext } = usePlaylists(token)
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
