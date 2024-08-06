import { useEffect, useState } from 'react'
import { BACKEND_API_URL } from '../constants'
import { Button } from './ui/button'
import { makeGetRequest } from '@/services/axiosRequests'

interface Props {
  authError: string | null
}
export function Login({ authError }: Props) {
  const [error, setError] = useState<string | null>(null)
  const handleClick = () => {
    makeGetRequest(`${BACKEND_API_URL}/login`)
      .then((response) => {
        window.location.replace(response)
      })
      .catch((e) => {
        setError(e.message)
      })
  }
  useEffect(() => {
    setError(authError)
  }, [authError])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        type="button"
        onClick={handleClick}
        className="mb-4">
        Connect to Spotify
      </Button>
      {error && (
        <p className="text-red-500">
          Couldn&apos;t connect to Spotify: {error}. Try again later
        </p>
      )}
    </div>
  )
}
