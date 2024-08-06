import { useState } from 'react'
import type { AIAction, AiPlaylistParams, PlayListsRes, Token } from '@/types'

import { aiPlaylist } from '@/services/aiPlaylist'
import { PromptForm } from './PromptFrom'
import { KeyInput } from './KeyInput'
import { fetchPlaylists } from '@/services/spotifyAPI'

interface Props {
  token: Token
  currentPlaylistId: string | undefined
  updatePlaylists: (newPlaylists: PlayListsRes) => void
}
export function AISection({
  token,
  currentPlaylistId,
  updatePlaylists,
}: Props) {
  const [apiKey, setApiKey] = useState(() => {
    const key = window.localStorage.getItem('key')
    return key || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const updateKey = (key: string) => {
    setApiKey(key)
    window.localStorage.setItem('key', key)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fields = new window.FormData(event.target as HTMLFormElement)
    const prompt = fields.get('prompt') as string
    const action = fields.get('action') as AIAction
    if (!prompt || !action || !apiKey) return
    setError('')
    setIsLoading(true)
    aiPlaylist({
      prompt,
      action,
      token,
      currentPlaylistId,
      apiKey,
    } as AiPlaylistParams)
      ?.then(() => {
        return fetchPlaylists({ token })
      })
      .then((playlistsRes) => {
        updatePlaylists(playlistsRes)
      })
      .catch((e: Error) => {
        setError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  // TODO: change styles of the textarea and select if any of their values is undefined or currentPlaylistId is undefined
  // TODO: add a loading component when playlist is being generated
  return (
    <div>
      {apiKey ? (
        <PromptForm
          currentPlaylistId={currentPlaylistId}
          handleSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
        />
      ) : (
        <KeyInput updateKey={updateKey} />
      )}
    </div>
  )
}
