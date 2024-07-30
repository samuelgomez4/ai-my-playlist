import type { PlaylistDetails, PlaylistItems } from '@/types'
import { PlaylistInfo } from './PlaylistInfo'
import { Songs } from './Songs'

interface Props {
  currentPlaylistDetails: PlaylistDetails | null
  currentPlaylistSongs: PlaylistItems | null
}
export function PlaylistContent({
  currentPlaylistDetails,
  currentPlaylistSongs,
}: Props) {
  return (
    <div className="flex flex-col gap-6 max-h-dvh">
      <PlaylistInfo currentPlaylistDetails={currentPlaylistDetails} />
      <Songs currentPlaylistSongs={currentPlaylistSongs} />
    </div>
  )
}
