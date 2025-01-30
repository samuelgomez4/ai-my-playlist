'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PlaylistGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';
import { promptSchema } from '@/schemas/formSchema';

export async function generateIdsToAdd(options: PlaylistGenerationOptions) {
  promptSchema.parse(options.prompt);
  const formattedSongs = JSON.stringify(formatSongsForAi(options.songs));
  try {
    const { text } = await generateText({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      system: `You are an assistant who receives a list of lists that represent tracks of a playlist. The shape of each one of the internal lists is the following: [id, name, artists[], album, duration with the format minutes:seconds, releaseDate, addedByUserAt]. The user would like to create a new playlist based on the current playlist or simply edit the current playlist. Your task as an assistant is to filter the list and simply return a list with ONLY the ids of the tracks using the prompt and the list of the current message from the user. You CANNOT reply with something that is not a list of ids of the tracks. That is, you don't reply with words, only the list of ids. The only reason you reply with something else that is not a list is if the user prompt contains or asks for something that is not related to creating a new list or editing the list or you cannot filter using the content of the list of songs or with your knowledge. In that case you have to answer 'error'. You can accept other languages other than English.`,
      messages: [
        {
          role: 'user',
          content: `Create a playlist that contains songs of Manuel Turizo only ${samplePlaylistString}`,
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
          content: 'error',
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
    const idsToAddList: Array<string> = JSON.parse(text);
    return { ok: true, idsToAddList };
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
