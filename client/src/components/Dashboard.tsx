import { usePlaylists } from '../hooks/usePlaylists'
import { useToken } from '../hooks/useToken'
import type { TokenReqBody } from '../types'
import { Layout } from './Layout'

interface Props {
  tokenReqBody: TokenReqBody
}
export function Dashboard({ tokenReqBody }: Props) {
  const token = useToken(tokenReqBody)
  const playLists = usePlaylists(token)
  return <Layout />
}
