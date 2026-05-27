'use server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { promptSchema } from '@/schemas/formSchema';

export async function generatePlaylistDetails(prompt: string) {
  promptSchema.parse(prompt);
  try {
    const { object } = await generateObject({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      schema: z.object({
        isOffTopic: z.boolean(),
        name: z.string(),
        description: z.string(),
      }),
      system: `You are an assistant who receives an instruction to create a new playlist 
      either from scratch or having another playlist as context. Your task is to respond 
      with an object that has two properties: name, which you will have 
      to create based on the prompt and description which you will have also to create from 
      the prompt. Use creative names and descriptions and don't make them too long. If the user prompt contains or asks for something that is not 
      related with creating a new list or editing the list, set isOffTopic to true.
      You can accept other languages other than english.`,
      messages: [
        {
          role: 'user',
          content: `Create a playlist that contains songs of Manuel Turizo only`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({
            isOffTopic: false,
            name: 'Manuel Turizo Playlist',
            description: 'Playlist with songs of Manuel Turizo',
          }),
        },
        {
          role: 'user',
          content: `What's the capital of France`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({
            isOffTopic: true,
            name: '',
            description: '',
          }),
        },
        {
          role: 'user',
          content: `Incluye canciones que duren más de 4 min`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({
            isOffTopic: false,
            name: 'Long Songs Playlist',
            description: 'Playlist with songs that last more than 4 minutes',
          }),
        },
        {
          role: 'user',
          content: `Qué pesa más, un kilo de plumas o un kilo de hierro?`,
        },
        {
          role: 'assistant',
          content: JSON.stringify({
            isOffTopic: true,
            name: '',
            description: '',
          }),
        },
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      temperature: 1,
    });
    if (object.isOffTopic) {
      return {
        ok: false,
        message: refuseOffTopicAnswer,
      };
    }
    const detailsObject = { name: object.name, description: object.description };
    return { ok: true, detailsObject };
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
