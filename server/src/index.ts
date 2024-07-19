import express from 'express'
import cors from 'cors'
import { URLSearchParams } from 'url'
import { generateRandomString } from './utils/generateRandomString'
import { AUTHORIZE_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPE } from './constants'

const app = express()
// avoid cors error
app.use(cors())

app.get('/login', (req, res) => {
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
  res.redirect(AUTHORIZE_ENDPOINT + queryParamsString)
})

app.listen(8888)
