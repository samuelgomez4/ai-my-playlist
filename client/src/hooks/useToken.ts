import axios from 'axios'
import { useEffect, useState } from 'react'
import type { TokenRes, TokenReqBody } from '../types'
import { BACKEND_API_URL } from '../constants'

export function useToken(tokenReqBody: TokenReqBody) {
  const [tokenRes, setTokenRes] = useState<TokenRes>()
  const accessToken = tokenRes?.accessToken
  const refreshToken = tokenRes?.refreshToken
  const expiresIn = tokenRes?.expiresIn
  // once an authCode is obtained from the spotifyApi, the dashboard component will be rendered
  // and this customHook will be called. An initial accesToken will be requested and the reponse
  // will obtain the accessToken, the refreshToken and the time the accessToken is valid for.
  // If an error ocurrs, the user will be redirected to home with an error.
  useEffect(() => {
    axios
      .post(`${BACKEND_API_URL}/token`, tokenReqBody)
      .then((res) => {
        // TODO: Type response
        setTokenRes(res.data)
      })
      .catch((e) => {
        const queryParams = new URLSearchParams({
          // TODO: Type error
          error: e.response.data.message,
        })
        window.location.replace(`/?${queryParams}`)
      })
  }, [tokenReqBody])
  // once the initial accessToken is obtained an interval will be created to obtain a new
  // access token as often as the access token is valid for (usually 3600 seconds) minus
  // 60 seconds so it's not very close to expire. For this we use the refershToken and the
  // response will be very similar to the one we got with the initial accessToken
  useEffect(() => {
    if (!expiresIn || !refreshToken) return
    const interval = setInterval(
      () => {
        axios
          .post(`${BACKEND_API_URL}/refresh`, { refreshToken })
          .then((res) => {
            setTokenRes((prevState) => {
              return { ...prevState, ...res.data }
            })
          })
          .catch((e) => {
            const queryParams = new URLSearchParams({
              error: e.response.data.message,
            })
            window.location.replace(`/?${queryParams}`)
          })
      },
      (expiresIn - 60) * 1000
    )
    return () => {
      clearInterval(interval)
    }
  }, [refreshToken, expiresIn])
  return accessToken
}
