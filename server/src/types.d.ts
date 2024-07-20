export type QueryParams = {
  response_type: string
  client_id: string
  scope: string
  redirect_uri: string
  state: string
}

export type TokenBody = {
  code: string
  state: string
}
