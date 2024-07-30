import type { AxiosResponse } from 'axios'
import { useState } from 'react'
import type { Token } from '@/types'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface Props {
  token: Token
  currentPlaylistId: string | undefined
  fetchSongs: ({
    tracksEndpoint,
    userToken,
  }: {
    tracksEndpoint: string
    userToken: Token
  }) => Promise<AxiosResponse>
}
export function PromptForm({ token, currentPlaylistId, fetchSongs }: Props) {
  const [prompt, setPrompt] = useState('')
  return (
    <form className="flex flex-col gap-4">
      <Textarea
        value={prompt}
        placeholder="Enter a prompt to generate a playlist..."
        className="resize-none rounded-lg border border-input bg-background p-4 text-sm"
        rows={3}
        onChange={(event) => {
          setPrompt(event.target.value)
        }}
      />
      <Button>AI My Playlist</Button>
    </form>
  )
}
