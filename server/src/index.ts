import express from 'express'
import cors from 'cors'
import { URLSearchParams } from 'url'
import SpotifyWebApi from 'spotify-web-api-node'
import {
  CLIENT_ID,
  SCOPE,
  REDIRECT_URI,
  AUTHORIZE_ENDPOINT,
  CLIENT_SECRET,
} from './constants'
import type { TokenBody, RefreshBody } from './types'
import { generateRandomString } from './utils/generateRandomString'

const app = express()
// avoid cors error
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  res.send('AI My Playlist API')
})

app.get('/login', (_, res) => {
  // Spotify suggests using state to avoid attacks such as cross-site request forgery
  const state = generateRandomString(16)
  const queryParams = {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state,
  }
  const searchParams = new URLSearchParams(queryParams)
  const queryParamsString = searchParams.toString()
  // send url for Spotify Accounts service to authorize the app
  res.send(AUTHORIZE_ENDPOINT + queryParamsString)
})

app.post('/token', (req, res) => {
  const { authCode, authState } = <TokenBody>req.body
  if (!authCode || !authState) {
    res.status(400).send('code and state are required')
    return
  }
  // TODO: validate state
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  })
  // request to url for Spotify Accounts service to get access token and refresh token
  spotifyApi
    .authorizationCodeGrant(authCode)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: 'There was a problem with the authentication' })
    })
})

app.post('/refresh', (req, res) => {
  const { refreshToken } = <RefreshBody>req.body
  if (!refreshToken) {
    res.status(400).send('token is required')
    return
  }
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  })
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: 'There was a problem keeping the user logged in' })
    })
})

app.listen(process.env.PORT || 3000)
export default app
