'use server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PlaylistGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';
import { promptSchema } from '@/schemas/formSchema';

export async function generateSongsSuggestions(options: PlaylistGenerationOptions) {
  promptSchema.parse(options.prompt);
  const formattedSongs = JSON.stringify(formatSongsForAi(options.songs));
  try {
    const { object } = await generateObject({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      schema: z.object({
        isOffTopic: z.boolean(),
        songs: z.array(z.string()).max(20),
      }),
      system: `You are an assistant who receives a prompt to create/edit a playlist or suggest new songs to add to a playlist. The user will send you an instruction for songs to add and you will have to respond with a list of maximum 20 names of songs to add including first the name of only the main artist and then immediately after without extra symbols or words the name of the song. The user can also send you along with the prompt a list that represents tracks of the playlist. The shape of each one of the internal list is the following: [id, name, artists[], album, duration with the format minutes:seconds, releaseDate, addedByUserAt]. In case the user includes the list is for you to have context but you have to suggest songs that are different from the ones the user already has. Your task as an assistant is simply to return the list with ONLY the names and artists of new songs. If the user prompt contains or asks for something that is not related to creating a new playlist or editing the playlist or adding new songs to the playlist, set isOffTopic to true. You can accept other languages other than English.`,
      messages: [
        {
          role: 'user',
          content: `create a playlist with songs played in Tomorrowland 2023`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({
            isOffTopic: false,
            songs: [
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
            ],
          }),
        },
        {
          role: 'user',
          content: `What's the capital of France ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({ isOffTopic: true, songs: [] }),
        },
        {
          role: 'user',
          content: `${options.prompt} ${formattedSongs}`,
        },
      ],
    });

    if (object.isOffTopic) {
      return {
        ok: false,
        message: refuseOffTopicAnswer,
      };
    }

    const songsSuggestionsList = object.songs;
    return { ok: true, songsSuggestionsList };
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
