export const BACKEND_API_URL = 'http://localhost:3000'

export const ACTIONS = {
  createFromScratch: 'createFromScratch',
  createFromSelected: 'createFromSelected',
  // addToSelected: 'addToSelected',
  // removeFromSelected: 'removeFromSelected',
} as const
export const AI_ACTIONS = {
  [ACTIONS.createFromScratch]: 'Create new playlist from scratch',
  [ACTIONS.createFromSelected]: 'Create playlist from selected playlist',
  // [ACTIONS.addToSelected]: 'Add songs to selected playlist',
  // [ACTIONS.removeFromSelected]: 'Remove songs from selected playlist',
} as const
