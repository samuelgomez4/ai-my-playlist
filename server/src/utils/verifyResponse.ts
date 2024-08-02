import { AI_ERROR_MESSAGES } from '../constants'

export function parseStringOrJson(
  input: string
): object | Array<string> | string {
  try {
    return JSON.parse(input)
  } catch (e) {
    return input
  }
}
export function verifyAIResponse<T>(response: string | T) {
  if (typeof response === 'string') {
    if (Object.values(AI_ERROR_MESSAGES).includes(response)) {
      throw new Error(response)
    }
    throw new Error(AI_ERROR_MESSAGES.refuseHelp)
  }
  return response
}
