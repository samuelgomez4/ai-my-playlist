import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'
import encryptedSongsSample from '@/mocks/encryptedSongs.json'
import { verifyAIResponse, verifyPrompt } from '../verifyResponse'
import type { EncryptedIdsReq, ListOfEncryptedIds } from '@/types'

const encryptedSongsString = JSON.stringify(encryptedSongsSample)

export async function respondWithIdsToRemove({
  prompt,
  encryptedSongs,
  apiKey,
}: EncryptedIdsReq) {
  verifyPrompt(prompt)
  const google = createGoogleGenerativeAI({
    apiKey,
  })
  const { text } = await generateText({
    model: google('models/gemini-1.5-pro-latest'),
    system: `You are an assistant who recieves a list of lists that represent tracks of a 
    playlist. The shape of each one of the internal list is the following: [id, name, artists[], 
    album, duration, releaseDate, addedByUserAt]. The user would like to remove songs from the 
    current playlist. Your task as an assistant is filter the list and simply return a list with 
    ONLY the ids of the tracks to remove using the prompt and the list of the current message 
    from the user. You CANNOT reply with something that is not a list of ids of the tracks. That is, 
    you don't reply with words, only the list of ids to remove. The only reason you reply with something 
    else that is not a list is if the user prompt contains or asks for something that is not related with 
    creating a new list or edit the list or remove songs from the playlist or you cannot filter using the 
    content of the list of songs or with your knowledge. In that case you have to answer 'I'm sorry I can't 
    help you with that. Try again with another prompt.' The other case is if none of the conditions are met 
    by any of the songs and then you have to reply. 'It seems like none of your current songs meets the criteria'. 
    You can accept other languages other than english.`,
    messages: [
      {
        role: 'user',
        content: `Remove songs from Manuel Turizo ${encryptedSongsString}`,
      },
      {
        role: 'assistant',
        content: '[0, 5, 7, 17]',
      },
      {
        role: 'user',
        content: `What's the capital of France ${encryptedSongsString}`,
      },
      {
        role: 'assistant',
        content: `I'm sorry I can't help you with that. Try again with another prompt.`,
      },
      {
        role: 'user',
        content: `${prompt} ${encryptedSongs}`,
      },
    ],
  })
  const verifiedText = verifyAIResponse(text)
  return verifiedText as ListOfEncryptedIds
}