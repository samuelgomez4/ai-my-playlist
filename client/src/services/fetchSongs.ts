import axios from 'axios'
import type { Token } from '@/types'

export function fetchSongs({
  tracksEndpoint,
  userToken,
}: {
  tracksEndpoint: string
  userToken: Token
}) {
  return axios.get(tracksEndpoint, {
    headers: { Authorization: `Bearer ${userToken}` },
  })
}
