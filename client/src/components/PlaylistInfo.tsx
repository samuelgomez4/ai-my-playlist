import type { PlaylistDetails } from '@/types'
import { Music2Icon } from './icons/icons'

interface Props {
  currentPlaylistDetails: PlaylistDetails | null
}
export function PlaylistInfo({ currentPlaylistDetails }: Props) {
  return (
    // TODO: render something when user has no playlists
    <header className="h-1/4 flex items-start gap-4 border border-input bg-background p-4 rounded-lg">
      {currentPlaylistDetails && (
        <div className="flex gap-8 h-full">
          {currentPlaylistDetails.imageUrl ? (
            <img
              src={currentPlaylistDetails.imageUrl}
              alt="Playlist Thumbnail"
            />
          ) : (
            <div className="h-full aspect-square bg-zinc-900 flex justify-center items-center">
              <Music2Icon className="w-16 h-16" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl">
              {currentPlaylistDetails.name}
            </h1>
            <p className="font-medium text-sm">
              {currentPlaylistDetails.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentPlaylistDetails.numberTracks} songs
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
