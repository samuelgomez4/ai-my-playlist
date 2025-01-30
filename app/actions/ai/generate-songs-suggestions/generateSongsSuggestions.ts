'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PlaylistGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';

export async function generateSongsSuggestions(options: PlaylistGenerationOptions) {
  const formattedSongs = JSON.stringify(formatSongsForAi(options.songs));
  try {
    const { text } = await generateText({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      system: `You are an assistant who receives a prompt to create/edit a playlist or suggest new songs to add to a playlist. The user will send you an instruction for songs to add and you will have to respond with a list (in a JSON format) of maximum 20 names of songs to add including first the name of only the main artist and then immediately after without extra symbols or words the name of the song. The user can also send you along with the prompt a list that represents tracks of the playlist. The shape of each one of the internal list is the following: [id, name, artists[], album, duration with the format minutes:seconds, releaseDate, addedByUserAt]. In case the user includes the list is for you to have context but you have to suggest songs that are different from the ones the user already has. Your task as an assistant is simply to return the list with ONLY the names and artists of new songs. You CANNOT reply with something that is not a list of the tracks. That is, you don't reply with words, only the list of songs. The only reason you reply with something else that is not a list is if the user prompt contains or asks for something that is not related to creating a new playlist or editing the playlist or adding new songs to the playlist. In that case you have to answer 'error'. You can accept other languages other than English.`,
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
          content: `What's the capital of France ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: 'error',
        },
        {
          role: 'user',
          content: `${prompt} ${formattedSongs}`,
        },
      ],
    });
    if (text === 'error') {
      return {
        ok: false,
        message: refuseOffTopicAnswer,
      };
    }
    return { ok: true, text };
  } catch (e) {
    if (e instanceof Error) {
      console.log({ message: e.message });
    }
    return {
      ok: false,
      message: AI_ERROR_MESSAGE,
    };
  }
}
