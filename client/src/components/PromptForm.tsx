import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export function PromptForm() {
  return (
    <form className="flex flex-col gap-4">
      <Textarea
        placeholder="Enter a prompt to generate a playlist..."
        className="resize-none rounded-lg border border-input bg-background p-4 text-sm"
        rows={3}
      />
      <Button>AI My Playlist</Button>
    </form>
  )
}
