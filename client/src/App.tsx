import { useEffect } from 'react'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { useCode } from './hooks/useCode'

function App() {
  // remove queryparams from url after page renders
  useEffect(() => {
    window.history.pushState({}, '', '/')
  }, [])
  const { authCode, authState, authError } = useCode()
  const refreshToken = window.localStorage.getItem('refreshToken')
  const reqToken = { authCode, authState, refreshToken }
  return authCode || refreshToken ? (
    <Dashboard {...reqToken} />
  ) : (
    <Login authError={authError} />
  )
}

export default App
