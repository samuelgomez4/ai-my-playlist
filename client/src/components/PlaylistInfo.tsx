import type { PlaylistDetails } from '@/types'
import { Button } from './ui/button'

interface Props {
  currentPlaylistDetails: PlaylistDetails | null
}
export function PlaylistInfo({ currentPlaylistDetails }: Props) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentPlaylistDetails && (
        <header className="flex items-start gap-4 rounded-lg border border-input bg-background p-4">
          <img
            src={currentPlaylistDetails.imageUrl}
            alt="Playlist Thumbnail"
            width={120}
            height={120}
            className="rounded-lg"
          />
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
        </header>
      )}
    </>
  )
}
