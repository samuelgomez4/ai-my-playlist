'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import type { PromptGenerationOptions } from '@/actions/ai/types/ai-generation-options';
import { formatSongsForAi } from '@/actions/ai/utils/formatSongsForAi';
import { AI_ERROR_MESSAGE } from '../utils/constants/constants';
import { samplePlaylistString } from '../utils/constants/samplePlaylist';

export async function generatePrompt(options: PromptGenerationOptions) {
  const formattedSongs = formatSongsForAi(options.songs);
  try {
    const { text } = await generateText({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      system: `You are an assistant that is used to create a prompt for another assistant that receives an instruction to create a new playlist either from scratch or having another playlist as context. Your task is to respond with a prompt. You're gonna receive an object with 2 properties one is the action that the user wants to do (the available actions are: "Create Playlist from Scratch" | "Create Playlist from Selected Playlist" | "Create New Playlist Based on Existing" | "Add New Songs to Existing Playlist" | "Delete Songs from Existing Playlist") and the other one is a list of songs that the AI will use to do the action. Your task is to grab the action and the list of songs to create a prompt. If no action is provided just choose a random from the ones available. If an empty list of songs is provided then create the prompt based only on the action with a more generic request but that it has to do with the action. The shape of each one of the internal list is the following: [id, name, artists[], album, duration with the format minutes:seconds, releaseDate, addedByUserAt]. You CANNOT reply with something that is not the prompt related with creating a new list or edit the list. For example:
      user: '{action: 'Create Playlist from Scratch', songs:[]}' ; assistant: 'Create a playlist of EDM'. Other options for this one could be 'Create a playlist of love', 'Create a playlist of reggaeton', 'Create a playlist of the 80's', 'Create a playlist with only women singers', 'Create a playlist with songs that last less than 4 min', 'Create a playlist of Colombian singers', etc. Another example could be: 
      user: '{action: 'Add new songs to existing playlist, songs:${samplePlaylistString}}.
      Some of the possibilities that the assistant could answer here are: "Create a playlist with more songs of reggaeton", "Add more songs of the album En Cero", "Add more songs from the 2010's", etc. 
      Based on the same playlist, other examples for the other actions could be:
      -Create Playlist from Selected Playlist: 'Create a playlist of songs of Daddy Yankee only', 'Create a new playlist with the songs that are more than 3:30 long', 'Create a playlist that includes the songs that are from the album Indeciso', 'Create a playlist of songs that were added after 2022', 'Create a playlist with songs whose title starts with the letter c', etc. 
      -Create New Playlist Based on Existing: "Create a new playlist with other songs from Manuel Turizo", "Create a playlist with the remix versions of the songs in the playlist if they exist", "Create a new playlist with different versions of the songs if they exist", etc. 
      -Delete Songs from Existing Playlist: 'Delete all the songs that are less than 4 min long", 'Delete all the songs from Yandel', 'Delete all the songs that were released before May 2019', 'Delete all the songs that have only one word in the title', 'Delete all the songs from the album "Runaway"', etc. 
      All of these are just a few examples but you can be as creative as possible but always take into account the action and playlist of the user if there is.`,
      messages: [
        {
          role: 'user',
          content: `{
          action: 'Create Playlist from Selected Playlist',
          songs: [${samplePlaylistString}]
          ]
        }`,
        },
        {
          role: 'assistant',
          content: 'Create a playlist with songs of Manuel Turizo only',
        },
        {
          role: 'user',
          content: JSON.stringify({ action: options.action, songs: formattedSongs }),
        },
      ],
      temperature: 1,
    });
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
