import { Button } from './ui/button'

export function PlaylistInfo() {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-input bg-background p-4">
      <img
        src="/placeholder.svg"
        alt="Playlist Thumbnail"
        width={120}
        height={120}
        className="rounded-lg"
      />
      <div className="flex-1">
        <div className="font-medium">Chill Beats</div>
        <div className="text-xs text-muted-foreground">20 songs</div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm">
            Play
          </Button>
          <Button
            variant="outline"
            size="sm">
            Add to Library
          </Button>
        </div>
      </div>
    </div>
  )
}
