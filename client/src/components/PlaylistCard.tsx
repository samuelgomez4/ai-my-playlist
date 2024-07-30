import type { PlaylistDetails } from '@/types'

interface Props {
  playlist: PlaylistDetails
  isActive: boolean
}
export function PlaylistCard({ playlist, isActive }: Props) {
  const { name, numberTracks, imageUrl } = playlist
  return (
    <article
      className={`flex items-top gap-4 rounded-lg p-4 transition-colors  ${
        isActive ? 'bg-gray-600' : 'bg-muted/50 hover:bg-muted'
      }`}>
      <img
        src={imageUrl}
        alt="Playlist Thumbnail"
        width={64}
        height={64}
        className="rounded-lg"
      />
      <div className="flex-1 text-left">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{numberTracks} songs</p>
      </div>
    </article>
  )
}
