import { Playlist, Playlists } from "@/services/filterPlaylistsData"

interface Props {
  playlist: Playlist
}
export function PlaylistCard({ playlist }: Props) {
  const { id, name, numberTracks, imageUrl } = playlist
  return (
    <div className="flex items-top gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
      <img
        src={imageUrl}
        alt="Playlist Thumbnail"
        width={64}
        height={64}
        className="rounded-lg"
      />
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{numberTracks} songs</p>
      </div>
    </div>
  )
}
