import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { MAX_LENGTH_PROMPT } from '@/constants'
import { AIActionSelect } from './AIActionSelect'

interface Props {
  currentPlaylistId: string | undefined
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  error: string
  isLoading: boolean
}
export function PromptForm({
  currentPlaylistId,
  handleSubmit,
  error,
  isLoading,
}: Props) {
  return (
    <form
      className="flex flex-col gap-4 w-full h-full"
      onSubmit={handleSubmit}>
      <Textarea
        maxLength={MAX_LENGTH_PROMPT}
        name="prompt"
        placeholder="Enter a prompt to generate a playlist..."
        className="resize-none rounded-lg border border-input bg-background p-4 text-sm h-full"
        rows={5}
        spellCheck="false"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4">
          <AIActionSelect
            name="action"
            currentPlaylistId={currentPlaylistId}
          />
          <Button type="submit">AI My Playlist</Button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
