export function PlaylistCard() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
      <img
        src="/placeholder.svg"
        alt="Playlist Thumbnail"
        width={64}
        height={64}
        className="rounded-lg"
      />
      <div className="flex-1">
        <p className="font-medium">Workout Playlist</p>
        <p className="text-xs text-muted-foreground">30 songs</p>
      </div>
    </div>
  )
}
