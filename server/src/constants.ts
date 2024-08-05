// spotify implements OAuth 2.0 framework for authorization
export const CLIENT_ID = process.env.CLIENT_ID || ''
export const REDIRECT_URI =
  process.env.REDIRECT_URI || 'https://ai-my-playlist.vercel.app'
export const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize?'
export const { CLIENT_SECRET } = process.env

// scope is used to specify the access level which the user has to authorize
export const SCOPE = `
user-read-email 
user-read-private 
playlist-read-private 
playlist-read-collaborative 
playlist-modify-private 
playlist-modify-public`

export const AI_ERROR_MESSAGES = {
  noMatch: 'It seems like none of your current songs meets the criteria',
  refuseHelp: `I'm sorry I can't help you with that. Try again with another prompt.`,
}

export const MAX_LENGTH_PROMPT = 400
