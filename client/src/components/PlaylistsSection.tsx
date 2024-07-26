import { ScrollArea, Scrollbar } from '@radix-ui/react-scroll-area'
import { usePlaylists } from '@/hooks/usePlaylists'
import { PlaylistCard } from './PlaylistCard'

interface Props {
  token: string | undefined
}

export function PlaylistsSection({ token }: Props) {
  const { playlists, error, isLoading, hasNext } = usePlaylists(token)
  return (
    <ScrollArea className="h-72">
      <div className="grid gap-4">
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        <Scrollbar orientation="vertical" />
      </div>
    </ScrollArea>
  )
}
