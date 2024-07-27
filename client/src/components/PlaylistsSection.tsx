import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'
import { usePlaylists } from '@/hooks/usePlaylists'
import { PlaylistCard } from './PlaylistCard'
import { useInitialPlaylistId } from '@/hooks/useInitialPlaylistId'

interface Props {
  token: string | undefined
  currentPlaylistId: string
  updateCurrentPlaylistId: (id: string) => void
}

export function PlaylistsSection({
  token,
  currentPlaylistId,
  updateCurrentPlaylistId,
}: Props) {
  // TODO display error, loading, etc. lazyload more playlists.
  const { playlists, error, isLoading, hasNext } = usePlaylists(token)
  useInitialPlaylistId(playlists, updateCurrentPlaylistId)
  return (
    <ScrollArea className="h-72">
      <ul className="grid gap-4">
        {playlists &&
          playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                className="w-full"
                type="button"
                aria-label={`Select playlist ${playlist.name}`}
                onClick={() => {
                  updateCurrentPlaylistId(playlist.id)
                }}>
                <PlaylistCard
                  playlist={playlist}
                  isActive={playlist.id === currentPlaylistId}
                />
              </button>
            </li>
          ))}
        <Scrollbar orientation="vertical" />
      </ul>
    </ScrollArea>
  )
}
