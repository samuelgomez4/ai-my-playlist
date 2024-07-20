import express from 'express'
import cors from 'cors'
import { URLSearchParams } from 'url'
import SpotifyWebApi from 'spotify-web-api-node'
import { generateRandomString } from './utils/generateRandomString'
import {
  AUTHORIZE_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SCOPE,
} from './constants'
import type { TokenBody, QueryParams } from './types'

const app = express()
// avoid cors error
app.use(cors())

app.get('/login', (_, res) => {
  // Spotify suggests using state to avoid attacks such as cross-site request forgery
  const state = generateRandomString(16)
  const queryParams: QueryParams = {
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
  const { code, state } = <TokenBody>req.body
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  })
  // request to url for Spotify Accounts service to get access token and refresh token
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accesToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})
app.listen(8888)
