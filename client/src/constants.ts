export const BACKEND_API_URL = import.meta.env.PROD
  ? 'https://b-psi-sooty.vercel.app'
  : 'http://localhost:3000'

export const ACTIONS = {
  createFromScratch: 'createFromScratch',
  createFromSelected: 'createFromSelected',
  createNewSongsFromSelected: 'createNewSongs',
  addToSelected: 'addToSelected',
  removeFromSelected: 'removeFromSelected',
} as const
export const AI_ACTIONS = {
  [ACTIONS.createFromScratch]: 'Create playlist from scratch',
  [ACTIONS.createFromSelected]: 'Create playlist from selected playlist',
  [ACTIONS.createNewSongsFromSelected]:
    'Create playlist with new songs from selected',
  [ACTIONS.addToSelected]: 'Add songs to selected playlist',
  [ACTIONS.removeFromSelected]: 'Remove songs from selected playlist',
} as const

export const AI_ERROR_MESSAGES = {
  noMatch: 'It seems like none of your current songs meets the criteria',
  refuseHelp: `I'm sorry I can't help you with that. Try again with another prompt.`,
}

export const MAX_LENGTH_PROMPT = 400

export const INITIAL_EXPIRATION_TIME = 3600
