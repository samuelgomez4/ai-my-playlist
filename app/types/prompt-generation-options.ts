import type { FeatureOption } from './feature';
import type { Id } from './playlist';

export interface PromptGenerationOptions {
  action: FeatureOption | '';
  playlistId: Id | undefined;
}
