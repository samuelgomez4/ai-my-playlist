import { PlaylistCard } from './PlaylistCard'

export function PlaylistsSection() {
  return (
    <div className="grid gap-4">
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
    </div>
  )
}
