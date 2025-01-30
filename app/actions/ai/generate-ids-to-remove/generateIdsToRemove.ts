'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PlaylistGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';

export async function generateIdsToRemove(options: PlaylistGenerationOptions) {
  const formattedSongs = JSON.stringify(formatSongsForAi(options.songs));
  try {
    const { text } = await generateText({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      system: `You are an assistant who receives a list of lists that represent tracks of a playlist. The shape of each one of the internal list is the following: [id, name, artists[], album, duration with the format minutes:seconds, releaseDate, addedByUserAt]. The user would like to remove songs from the current playlist. Your task as an assistant is to filter the list and simply return a list with ONLY the ids of the tracks to remove using the prompt and the list of the current message from the user. The user might ask explicitly to remove songs or to keep some others. The important thing is you make the logic to know which songs to keep or which to remove and respond with the playlists that need to be removed. You CANNOT reply with something that is not a list of ids of the tracks. That is, you don't reply with words, only the list of ids to remove. The only reason you reply with something else that is not a list is if the user prompt contains or asks for something that is not related to creating a new list or editing the list or removing songs from the playlist or you cannot filter using the content of the list of songs or with your knowledge. In that case, you have to answer 'error'. You can accept other languages other than English.`,
      messages: [
        {
          role: 'user',
          content: `Remove songs from Manuel Turizo ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: '[0, 5, 7, 17]',
        },
        {
          role: 'user',
          content: `What's the capital of France ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: `I'm sorry I can't help you with that. Try again with another prompt.`,
        },
        {
          role: 'user',
          content: `Keep songs from Manuel Turizo ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: '[0, 5, 7, 17]',
        },
        {
          role: 'user',
          content: `Keep the songs that are longer than 4 min ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content: `[0, 2, 3, 4, 5, 6, 8, 10, 12, 13, 14, 16, 17, 18, 19]`,
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
