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
  MAX_LENGTH_PROMPT,
} from './constants'
import type {
  QueryParams,
  TokenBody,
  RefreshBody,
  GetNameAndDescriptionReq,
  NameAndDescription,
  GetSongsFromSelectedReq,
  ListOfEncryptedIds,
  GetQueriesReq,
} from './types'
import { generateRandomString } from './utils/generateRandomString'
import { parseStringOrJson, verifyAIResponse } from './utils/verifyResponse'
import { respondWithNameAndDescription } from './vercel-ai-sdk/createNameAndDescription'
import { respondWithIdsToAddFromSelected } from './vercel-ai-sdk/idsToAddFromSelected'
import { respondWithQueriesToAdd } from './vercel-ai-sdk/songsQueriesToAdd'

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
        .json({ message: 'There was a problem with reauthentication' })
    })
})

app.post('/name-and-description', (req, res) => {
  const { prompt } = <GetNameAndDescriptionReq>req.body
  if (!prompt) {
    res.status(400).send('prompt is required')
    return
  }
  if (prompt.length > MAX_LENGTH_PROMPT) {
    res.status(400).send('prompt is too long')
    return
  }
  respondWithNameAndDescription({
    prompt,
  })
    .then((AIResponse) => {
      const parsedResponse = parseStringOrJson(AIResponse) as
        | NameAndDescription
        | string
      const nameAndDescription = verifyAIResponse(parsedResponse)
      res.json(nameAndDescription)
    })
    .catch((e: Error) => {
      res.status(400).json(e)
    })
})

app.post('/get-songs-from-selected', (req, res) => {
  const { prompt, encryptedSongs } = <GetSongsFromSelectedReq>req.body
  if (!prompt || !encryptedSongs) {
    res.status(400).send('prompt and encryptedSongs are required')
    return
  }
  if (prompt.length > MAX_LENGTH_PROMPT) {
    res.status(400).send('prompt is too long')
    return
  }
  respondWithIdsToAddFromSelected({
    prompt,
    encryptedSongs: JSON.stringify(encryptedSongs),
  })
    .then((response) => {
      const parsedResponse = parseStringOrJson(response) as
        | ListOfEncryptedIds
        | string
      const listOfEncryptedIdsToAdd = verifyAIResponse(parsedResponse)
      res.json(listOfEncryptedIdsToAdd)
    })
    .catch((e: Error) => {
      res.status(400).json(e)
    })
})

app.post('/get-songs-queries', (req, res) => {
  const { prompt, encryptedSongs } = <GetQueriesReq>req.body
  if (!prompt) {
    res.status(400).send('prompt and encryptedSongs are required')
    return
  }
  if (prompt.length > MAX_LENGTH_PROMPT) {
    res.status(400).send('prompt is too long')
    return
  }
  respondWithQueriesToAdd({
    prompt,
    encryptedSongs: JSON.stringify(encryptedSongs),
  })
    .then((response) => {
      const parsedResponse = parseStringOrJson(response) as string[] | string
      const listOfQueriesToAdd = verifyAIResponse(parsedResponse)
      if (listOfQueriesToAdd.length > 50) {
        res.json(listOfQueriesToAdd.slice(0, 50))
        return
      }
      res.json(listOfQueriesToAdd)
    })
    .catch((e: Error) => {
      res.status(400).json(e)
    })
})

export default app