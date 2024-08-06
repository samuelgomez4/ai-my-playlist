import type { PlaylistDetails } from '@/types'
import { Music2Icon } from './icons/icons'

interface Props {
  playlist: PlaylistDetails
  isActive: boolean
}
export function PlaylistCard({ playlist, isActive }: Props) {
  const { name, numberTracks, imageUrl } = playlist
  return (
    <article
      className={`flex items-top gap-4 p-4 transition-colors rounded-lg  ${
        isActive ? 'bg-gray-600' : 'bg-muted/50 hover:bg-muted'
      }`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Playlist Thumbnail"
          width={64}
          height={64}
        />
      ) : (
        <div className="w-16 h-16 bg-zinc-900 flex justify-center items-center">
          <Music2Icon className="w-8 h-8" />
        </div>
      )}

      <div className="flex-1 text-left">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{numberTracks} songs</p>
      </div>
    </article>
  )
}
