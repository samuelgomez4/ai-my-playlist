export interface TokenReqBody {
  authCode: string
  authState: string | null
}

export interface TokenRes {
  accessToken: string
  refreshToken: string
  expiresIn: number
}
