import { useMemo } from 'react'

export function useCode() {
  // once the user authorizes the use of the app, the code and state will be appended
  // to the URL that the user will be redirected to. That's why we only read them the
  // first time the page is loaded. If the user doesn't authorize, an error will be
  // appended instead of the code.
  const authParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      authCode: params.get('code'),
      authState: params.get('state'),
      authError: params.get('error'),
    }
  }, [])
  return authParams
}
