import { PlaylistInfo } from './PlaylistInfo'
import { Songs } from './Songs'

export function PlaylistContent() {
  return (
    <div className="flex flex-col gap-6">
      <PlaylistInfo />
      <Songs />
    </div>
  )
}
