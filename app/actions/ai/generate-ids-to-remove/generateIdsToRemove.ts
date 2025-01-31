'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PlaylistGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';
import { promptSchema } from '@/schemas/formSchema';

export async function generateIdsToRemove(options: PlaylistGenerationOptions) {
  promptSchema.parse(options.prompt);
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
          content:
            '["e1c0d1f0-1c0d-1f0e-1c0d-1f0e1c0d1f0e", "f6a5b4c7-6a5b-4c7f-6a5b-4c7f6a5b4c7f", "b8c7d6e9-8c7d-6e9b-8c7d-6e9b8c7d6e9b", "f8a7b6c9-8a7b-6c9f-8a7b-6c9f8a7b6c9f"]',
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
          content: `Keep the songs that are longer than 4 min ${samplePlaylistString}`,
        },
        {
          role: 'assistant',
          content:
            '["e1c0d1f0-1c0d-1f0e-1c0d-1f0e1c0d1f0e", "c3d2e1f4-3d2e-1f4c-3d2e-1f4c3d2e1f4c", "d4e3f2a5-4e3f-2a5d-4e3f-2a5d4e3f2a5d", "e5f4a3b6-5f4a-3b6e-5f4a-3b6e5f4a3b6e", "f6a5b4c7-6a5b-4c7f-6a5b-4c7f6a5b4c7f", "a7b6c5d8-7b6c-5d8a-7b6c-5d8a7b6c5d8a", "c9d8e7f0-9d8e-7f0c-9d8e-7f0c9d8e7f0c", "e1f0a9b2-1f0a-9b2e-1f0a-9b2e1f0a9b2e", "a3b2c1d4-3b2c-1d4a-3b2c-1d4a3b2c1d4a", "b4c3d2e5-4c3d-2e5b-4c3d-2e5b4c3d2e5b", "c5d4e3f6-5d4e-3f6c-5d4e-3f6c5d4e3f6c", "e7f6a5b8-7f6a-5b8e-7f6a-5b8e7f6a5b8e", "f8a7b6c9-8a7b-6c9f-8a7b-6c9f8a7b6c9f", "a9b8c7d0-9b8c-7d0a-9b8c-7d0a9b8c7d0a", "b0c9d8e1-0c9d-8e1b-0c9d-8e1b0c9d8e1b"]',
        },
        {
          role: 'user',
          content: `${options.prompt} ${formattedSongs}`,
        },
      ],
    });
    if (text === 'error') {
      return {
        ok: false,
        message: refuseOffTopicAnswer,
      };
    }
    const idsToRemoveList: Array<string> = JSON.parse(text);
    return { ok: true, idsToRemoveList };
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
