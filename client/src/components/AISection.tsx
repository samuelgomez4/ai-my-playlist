import { useState } from 'react'
import type { AIAction, AiPlaylistParams, Token } from '@/types'

import { aiPlaylist } from '@/services/aiPlaylist'
import { PromptForm } from './PromptFrom'
import { KeyInput } from './KeyInput'

interface Props {
  token: Token
  currentPlaylistId: string | undefined
}
export function AISection({ token, currentPlaylistId }: Props) {
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
