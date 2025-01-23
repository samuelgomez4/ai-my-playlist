import { MAX_LENGTH_PROMPT } from '@/utils/constants/constants';
import { ACTIONS } from '@/utils/constants/features';
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
        ACTIONS.addNewSongs,
        ACTIONS.createBasedOnExisting,
        ACTIONS.createFromScratch,
        ACTIONS.createFromSelected,
        ACTIONS.deleteSongs,
      ],
      { message: 'Action is required' }
    ),
    playlist: z.object(
      {
        id: z.string(),
        name: z.string(),
        image: z.string().url(),
      },
      { message: 'Playlist is required' }
    ),
  })
  .required();
