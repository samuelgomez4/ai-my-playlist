import { MAX_LENGTH_PROMPT } from '@/utils/constants/constants';
import { z } from 'zod';

export const formSchema = z
  .object({
    prompt: z
      .string()
      .min(1, { message: 'Prompt is required' })
      .max(MAX_LENGTH_PROMPT, {
        message: `Prompt must be at most ${MAX_LENGTH_PROMPT} characters`,
      }),
    action: z.enum(
      [
        'Create Playlist from Scratch',
        'Create Playlist from Selected Playlist',
        'Create New Playlist Based on Existing',
        'Add New Songs to Existing Playlist',
        'Delete Songs from Existing Playlist',
      ],
      { message: 'Action is required' }
    ),
    playlist: z.object(
      {
        id: z.string().nonempty({ message: 'Playlist ID is required' }),
        name: z.string().nonempty({ message: 'Playlist name is required' }),
        image: z.string().url({ message: 'Playlist image must be a valid URL' }),
      },
      { message: 'Playlist is required' }
    ),
  })
  .required();
