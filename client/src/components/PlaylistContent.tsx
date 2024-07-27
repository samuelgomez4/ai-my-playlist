import { PlaylistInfo } from './PlaylistInfo'
import { Songs } from './Songs'

interface Props {
  token: string | undefined
  currentPlaylistId: string
}
export function PlaylistContent({ currentPlaylistId }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <PlaylistInfo />
      <Songs />
    </div>
  )
}
