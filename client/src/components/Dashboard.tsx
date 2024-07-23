import { useToken } from '../hooks/useToken'
import type { TokenReqBody } from '../types'

interface Props {
  tokenReqBody: TokenReqBody
}
export function Dashboard({ tokenReqBody }: Props) {
  const token = useToken(tokenReqBody)
  return <h1>Dashboard</h1>
}
