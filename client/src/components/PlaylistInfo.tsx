import type { PlaylistDetails } from '@/types'

interface Props {
  currentPlaylistDetails: PlaylistDetails | null
}
export function PlaylistInfo({ currentPlaylistDetails }: Props) {
  return (
    // TODO: render something when user has no playlists
    <header className="flex items-start gap-4 border border-input bg-background p-4">
      {currentPlaylistDetails && (
        <div className="flex gap-8">
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
