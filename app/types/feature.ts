import type { features } from '@/utils/constants/features';

export type FeatureOption = (typeof features)[number]['title'];
