import { useEffect, useState } from 'react'
import { BACKEND_API_URL } from '../constants'

interface Props {
  authError: string | null
}
export function Login({ authError }: Props) {
  const [error, setError] = useState<string | null>(null)
  const handleClick = () => {
    fetch(`${BACKEND_API_URL}/login`)
      .then((response) => {
        return response.text()
      })
      .then((authUrl) => {
        window.location.replace(authUrl)
      })
      .catch((e: Error) => {
        setError(e.message)
      })
  }
  useEffect(() => {
    setError(authError)
  }, [authError])

  return (
    <>
      <button
        type="button"
        onClick={handleClick}>
        Connect to Spotify
      </button>
      {error && (
        <p className="error">
          Couldn&apos;t connect to Spotify: {error}. Try again later
        </p>
      )}
    </>
  )
}
