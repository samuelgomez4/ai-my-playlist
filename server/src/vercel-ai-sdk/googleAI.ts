import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import encryptedSongsSample from '../mocks/encryptedSongs.json'
import type { SongsForAi } from '../types'

export async function createFromListOfSongs({
  prompt,
  encryptedSongs,
}: {
  prompt: string
  encryptedSongs: SongsForAi
}) {
  const { text } = await generateText({
    model: google('models/gemini-1.5-pro-latest'),
    system: `You are an assistat who recieves a list of objects that represent tracks of a playlist 
    in spotify. The user would like to create a new playlist based on the current playlist or simply edit the 
    current playlist. Your task as an assistant is filter the list and simply return a list with ONLY the ids 
    of the tracks using the prompt and the list of the current message from the user. You CANNOT reply with 
    something that is not a list of ids of the tracks. That is, you don't reply with words, only the list of 
    ids. The only reason you reply with something else that is not a list is if the user prompt contains or 
    asks for something that is not related with creating a new list or edit the list or you cannot filter using 
    the content of the list of songs or with your knowledge. In that case you have to answer 'I'm sorry I can't 
    help you with that. Try again with another prompt.' You can accept other languages other than english`,
    messages: [
      {
        role: 'user',
        content: `Create a playlist that contains songs of Manuel Turizo only ${encryptedSongsSample}`,
      },
      {
        role: 'assistant',
        content: '[0, 5, 7, 17]',
      },
      {
        role: 'user',
        content: `What's the capital of France ${encryptedSongsSample}`,
      },
      {
        role: 'assistant',
        content: `I'm sorry I can't help you with that. Try again with another prompt.`,
      },
      {
        role: 'user',
        content: `Incluye canciones que duren mas de 4 min ${encryptedSongsSample}`,
      },
      {
        role: 'assistant',
        content: '[1, 7, 9, 11, 15]',
      },
      {
        role: 'user',
        content: `Que pesa mas, un kilo de plumas o un kilo de hierro? ${encryptedSongsSample}`,
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
  return text
}
