import type { FeatureOption } from './feature';
import type { Songs } from './playlist';

export interface PromptGenerationOptions {
  action: FeatureOption | '';
  songs: Songs | undefined;
}
