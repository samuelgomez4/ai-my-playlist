import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'
import encryptedSongsSample from '@/mocks/encryptedSongs.json'
import type { QueriesReq } from '@/types'
import { verifyAIResponse, verifyPrompt } from '../verifyResponse'

const encryptedSongsString = JSON.stringify(encryptedSongsSample)

export async function respondWithQueriesToAdd({
  prompt,
  encryptedSongs = '',
  apiKey,
}: QueriesReq) {
  verifyPrompt(prompt)
  const google = createGoogleGenerativeAI({
    apiKey,
  })
  try {
    const { text } = await generateText({
      model: google('models/gemini-1.5-pro-latest', {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_ONLY_HIGH',
          },
        ],
      }),
      system: `You are an assistant who recieves a prompt to create/edit a playlist or suggest 
    new songs to add to a playlist. The user will send you an instruction for songs to add and 
    you will have to respond with a list (in a JSON format) of maximum 50 names of songs to add 
    including first the name of only the main artist and then immediately after without extra 
    symbols or words the name of the song. If the user does not specify the number of songs 
    suggest exactly 30 songs . If the user does specify the number suggest only 50 in case the 
    number is greater than 50. The user can also send you along with the prompt a list that 
    represent tracks of the playlist. The shape of each one of the internal list is the following: 
    [id, name, artists[], album, duration, releaseDate, addedByUserAt]. In case the user includes 
    the list is for you to have context but you have to suggest songs that are different from the 
    ones the user already have. Your task as an assistant is simply return the list with ONLY the 
    names and artists of new songs. You CANNOT reply with something that is not a list of 
    the tracks. That is, you don't reply with words, only the list of songs. The only reason you 
    reply with something else that is not a list is if the user prompt contains or asks for 
    something that is not related with creating a new playlist or edit the playlist or add new songs 
    to the playlist. In that case you have to answer 'I'm sorry I can't help you with that. Try again 
    with another prompt.' 
    You can accept other languages other than english.`,
      messages: [
        {
          role: 'user',
          content: `create a playlist with songs played in Tomorrowland 2023`,
        },
        {
          role: 'assistant',
          content: `${JSON.stringify([
            'David Guetta Titanium',
            'Avicii Wake Me Up',
            'Martin Garrix Animals',
            'Sebastian Ingrosso Reload',
            "Swedish House Mafia Don't You Worry Child",
            'Don Diablo Starlight (Could You Be Mine)',
            'DVBBS Tsunami',
            'Martin Solveig Intoxicated',
            'Major Lazer Lean On',
            'Meduza Lose Control',
            'Armin van Buuren This Is What It Feels Like',
            'FISHER Losing It',
            'Showtek Get Loose',
            'Nelly Furtado Promiscuous',
            'Afrojack Take Over Control',
            'The Prodigy Firestarter',
            'Dimitri Vegas & Like Mike The Hum',
            'David Guetta Bad',
            'Black Eyed Peas Boom Boom Pow',
            'R3HAB On The Run',
          ])}`,
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
    const verifiedText = verifyAIResponse(text) as string[]
    if (verifiedText.length > 50) {
      verifiedText.slice(0, 50)
    }
    return verifiedText
  } catch {
    throw new Error(
      'Try again with another prompt. If the problem persists, you might have reached the limit of requests in a minute or for the day.'
    )
  }
}
