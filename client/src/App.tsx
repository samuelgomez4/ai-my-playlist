import { useMemo } from 'react'
import './App.css'
import { Login } from './components/Login'

function App() {
  const code = useMemo(() => {
    return new URLSearchParams(window.location.search).get('code')
  }, [])
  return <Login />
}

export default App
