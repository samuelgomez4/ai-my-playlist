import { MAX_LENGTH_PROMPT } from '@/utils/constants/constants';
import { ACTIONS } from '@/utils/constants/features';
import { z } from 'zod';

export const promptSchema = z
  .string()
  .min(1, { message: 'Prompt is required' })
  .max(MAX_LENGTH_PROMPT, {
    message: `Prompt must be at most ${MAX_LENGTH_PROMPT} characters`,
  });

export const formSchema = z
  .object({
    prompt: promptSchema,
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
    playlist: z
      .object({
        id: z.string(),
        name: z.string(),
        image: z.string().url(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.action !== ACTIONS.createFromScratch && !data.playlist) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Playlist is required',
      });
    }
  });
