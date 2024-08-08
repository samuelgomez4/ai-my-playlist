import { useState } from 'react'
import type {
  AIAction,
  AiPlaylistParams,
  PlaylistDetails,
  PlayListsRes,
  Token,
} from '@/types'

import { aiPlaylist } from '@/services/aiPlaylist'
import { PromptForm } from './PromptFrom'
import { KeyInput } from './KeyInput'
import { fetchPlaylists, getPlaylistsEndpoint } from '@/services/spotifyAPI'

interface Props {
  token: Token
  currentPlaylistDetails: PlaylistDetails | null
  updatePlaylists: (newPlaylists: PlayListsRes, reset?: boolean) => void
}
export function AISection({
  token,
  currentPlaylistDetails,
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
    if (!prompt) {
      setError('Please enter a prompt.')
      return
    }
    if (!action) {
      setError('Please select what you want to do.')
      return
    }
    if (!apiKey) return
    setError('')
    setIsLoading(true)
    aiPlaylist({
      prompt,
      action,
      token,
      currentPlaylistDetails,
      apiKey,
    } as AiPlaylistParams)
      ?.then(() => {
        const playlistsUrl = getPlaylistsEndpoint({ limit: '10' })
        return fetchPlaylists({ token, playlistsUrl })
      })
      .then((playlistsRes) => {
        updatePlaylists(playlistsRes, true)
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
    <div className="w-full flex justify-center">
      {apiKey ? (
        <PromptForm
          currentPlaylistId={currentPlaylistDetails?.id}
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
