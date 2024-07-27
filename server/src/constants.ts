import { getEnv } from './utils/getEnv'

// spotify implements OAuth 2.0 framework for authorization
export const CLIENT_ID = 'cd601ca9deab4d55ad4a4214d7146d58'
export const REDIRECT_URI = 'http://localhost:5173'
export const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize?'
// getEnv method ensures that a string is returned
export const CLIENT_SECRET = getEnv('CLIENT_SECRET')

// scope is used to specify the access level which the user has to authorize
export const SCOPE = `playlist-read-private 
playlist-read-collaborative 
playlist-modify-private 
playlist-modify-public`
