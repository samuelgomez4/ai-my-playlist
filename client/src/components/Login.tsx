import { useState } from 'react'

export function Login() {
  const [error, setError] = useState<string | null>(null)
  const handleClick = () => {
    fetch('http://localhost:8888/login')
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
