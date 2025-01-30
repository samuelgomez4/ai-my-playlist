'use server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { largeModel, safetySettings } from '../config';
import { AI_ERROR_MESSAGE, refuseOffTopicAnswer } from '../utils/constants/constants';
import { promptSchema } from '@/schemas/formSchema';

export async function generatePlaylistDetails(prompt: string) {
  promptSchema.parse(prompt);
  try {
    const { text } = await generateText({
      model: google(largeModel, { safetySettings: [safetySettings] }),
      maxTokens: 100,
      system: `You are an assistant who recieves an instruction to create a new playlist 
      either from scratch or having another playlist as context. Your task is to respond 
      with an javascript object in JSON that has two propeties: name, which you will have 
      to create based on the prompt and description will you will have also to create from 
      the prompt. Use creative names and decriptions and don't make them too long. You CANNOT 
      reply with something that is not an object with name and description properties. That is, 
      you don't reply with words, only the object. The only reason you reply with something else 
      that is not the object is if the user prompt contains or asks for something that is not 
      related with creating a new list or edit the list. In that case you have to answer 'error' 
      You can accept other languages other than english.`,
      messages: [
        {
          role: 'user',
          content: `Create a playlist that contains songs of Manuel Turizo only`,
        },
        {
          role: 'assistant',
          content:
            '{"name": "Manuel Turizo Playlist", "description": "Playlist with songs of Manuel Turizo"}',
        },
        {
          role: 'user',
          content: `What's the capital of France`,
        },
        {
          role: 'assistant',
          content: 'error',
        },
        {
          role: 'user',
          content: `Incluye canciones que duren más de 4 min`,
        },
        {
          role: 'assistant',
          content:
            '{"name": "Long Songs Playlist", "description": "Playlist with songs that last more than 4 minutes"}',
        },
        {
          role: 'user',
          content: `Qué pesa más, un kilo de plumas o un kilo de hierro?`,
        },
        {
          role: 'assistant',
          content: 'error',
        },
        {
          role: 'user',
          content: `${prompt}`,
        },
      ],
      temperature: 1,
    });
    if (text === 'error') {
      return {
        ok: false,
        message: refuseOffTopicAnswer,
      };
    }
    const detailsObject: { name: string; description: string } = JSON.parse(text);
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
