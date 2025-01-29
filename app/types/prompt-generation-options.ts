import type { FeatureOption } from './feature';
import type { Id } from './playlist-info';

export interface PromptGenerationOptions {
  action: FeatureOption | '';
  playlistId: Id | undefined;
}
