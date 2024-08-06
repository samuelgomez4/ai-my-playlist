import { AI_ERROR_MESSAGES } from '../constants'

export function verifyPrompt(prompt: string) {
  if (prompt.length > 400) {
    throw new Error('Prompt is too long')
  }
}
export function parseJson(input: string): object | Array<string> | string {
  try {
    return JSON.parse(input)
  } catch (e) {
    return input
  }
}
export function verifyAIResponse(aiResponse: string) {
  const parsedResponse = parseJson(aiResponse)
  if (typeof parsedResponse === 'string') {
    if (Object.values(AI_ERROR_MESSAGES).includes(parsedResponse)) {
      throw new Error(parsedResponse)
    }
    throw new Error(AI_ERROR_MESSAGES.refuseHelp)
  }
  return parsedResponse
}
