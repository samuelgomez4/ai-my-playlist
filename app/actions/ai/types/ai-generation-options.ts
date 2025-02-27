import type { FeatureOption } from '@/types/feature';
import type { Songs } from '@/types/playlist';

export interface PromptGenerationOptions {
  action: FeatureOption | '';
  songs: Songs;
}

export interface PlaylistGenerationOptions {
  prompt: string;
  songs: Songs;
}
