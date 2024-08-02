import type { PlaylistDetails } from '@/types'
import { Button } from './ui/button'

interface Props {
  currentPlaylistDetails: PlaylistDetails | null
}
export function PlaylistInfo({ currentPlaylistDetails }: Props) {
  return (
    // TODO: render something when user has no playlists
    <header className="flex items-start gap-4 border border-input bg-background p-4">
      {currentPlaylistDetails && (
        <div>
          {currentPlaylistDetails.imageUrl ? (
            <img
              src={currentPlaylistDetails.imageUrl}
              alt="Playlist Thumbnail"
              width={120}
              height={120}
            />
          ) : (
            <div className="w-32 h-32 bg-zinc-900" />
          )}
          <div className="flex-1">
            <h1 className="font-medium">{currentPlaylistDetails.name}</h1>
            <p className="text-xs text-muted-foreground">
              {currentPlaylistDetails.numberTracks} songs
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm">
                Play
              </Button>
              <Button
                variant="outline"
                size="sm">
                Add to Library
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
