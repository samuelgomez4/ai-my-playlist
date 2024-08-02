import { useState } from 'react'
import type { AIAction, AiPlaylistParams, Token } from '@/types'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ACTIONS, AI_ACTIONS } from '@/constants'
import { aiPlaylist } from '@/services/aiPlaylist'

interface Props {
  token: Token
  currentPlaylistId: string | undefined
}
export function PromptForm({ token, currentPlaylistId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fields = new window.FormData(event.target as HTMLFormElement)
    const prompt = fields.get('prompt') as string
    const action = fields.get('action') as AIAction
    if (!prompt || !action) return
    setError('')
    setIsLoading(true)
    aiPlaylist({
      prompt,
      action,
      token,
      currentPlaylistId,
    } as AiPlaylistParams)
      ?.catch((e: Error) => {
        setError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  // TODO: change styles of the textarea and select if any of their values is undefined
  // or currentPlaylistId is undefined
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}>
      <Textarea
        maxLength={400}
        name="prompt"
        placeholder="Enter a prompt to generate a playlist..."
        className="resize-none rounded-lg border border-input bg-background p-4 text-sm"
        rows={4}
      />
      <div className="flex gap-4">
        <Select name="action">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="What do you want to do?" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AI_ACTIONS).map(([action, description]) => {
              if (!currentPlaylistId && action !== ACTIONS.createFromScratch)
                return null
              return (
                <SelectItem
                  key={action}
                  value={action}>
                  {description}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button type="submit">AI My Playlist</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading...</p>}
    </form>
  )
}
