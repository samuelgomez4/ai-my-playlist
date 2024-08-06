/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { TokenRes, TokenReqBody } from '../types'
import { BACKEND_API_URL, INITIAL_EXPIRATION_TIME } from '../constants'
import { makePostRequest } from '@/services/axiosRequests'

export function useToken(tokenReqBody: TokenReqBody) {
  const isFirstRender = useRef(true)
  const [accessToken, setAccessToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState(() => {
    return tokenReqBody.refreshToken || undefined
  })
  const [expiresIn, setExpiresIn] = useState<number>(INITIAL_EXPIRATION_TIME)
  // once an authCode is obtained from the spotifyApi, the dashboard component will be rendered
  // and this customHook will be called. An initial accesToken will be requested and the reponse
  // will obtain the accessToken, the refreshToken and the time the accessToken is valid for.
  // If an error ocurrs, the user will be redirected to home with an error.
  useEffect(() => {
    if (!tokenReqBody.authCode && refreshToken) return
    makePostRequest(`${BACKEND_API_URL}/token`, {
      authCode: tokenReqBody.authCode,
      authState: tokenReqBody.authState,
    })
      .then((res) => {
        const response = res as TokenRes
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        setExpiresIn(response.expiresIn)
        window.localStorage.setItem('refreshToken', res.refreshToken)
        isFirstRender.current = false
      })
      .catch((e) => {
        const error = e as Error
        const queryParams = new URLSearchParams({
          error: error.message,
        })
        window.location.replace(`/?${queryParams}`)
      })
  }, [])
  // once the initial accessToken is obtained an interval will be created to obtain a new
  // access token as often as the access token is valid for (usually 3600 seconds) minus
  // 60 seconds so it's not very close to expire. For this we use the refershToken and the
  // response will be very similar to the one we got with the initial accessToken
  const refresh = useCallback(async () => {
    try {
      const res = await makePostRequest(`${BACKEND_API_URL}/refresh`, {
        refreshToken,
      })
      const response = res as Omit<TokenRes, 'refreshToken'>
      setAccessToken(response.accessToken)
      setExpiresIn(response.expiresIn)
    } catch (e) {
      const error = e as Error
      const queryParams = new URLSearchParams({
        error: error.message,
      })
      window.localStorage.removeItem('refreshToken')
      window.location.replace(`/?${queryParams}`)
    }
  }, [])

  useEffect(() => {
    if (!refreshToken) return
    if (isFirstRender.current) {
      refresh().then(() => {
        isFirstRender.current = false
      })
    }
    const interval = setInterval(
      () => {
        refresh()
      },
      (expiresIn - 60) * 1000
    )
    return () => {
      clearInterval(interval)
    }
  }, [expiresIn, refreshToken])
  return accessToken
}
