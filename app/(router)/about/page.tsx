import { features } from '@/utils/constants/features';
import { FeatureCard } from './components/FeatureCard';
import { FeatureVideo } from '@/components/ui/video/FeatureVideo';
import { Suspense } from 'react';

export const metadata = {
  title: 'AIMyPlaylist - About',
  description: 'Learn all you can do with AIMyPlaylist an AI-powered playlist generator and editor',
};

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-8">
      <header className="flex flex-col items-center justify-center mb-12 gap-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center text-balance">
          Explore AIMyPlaylist Features
        </h2>
        <p className="text-gray-400 text-xl max-w-prose text-pretty text-center">
          Our AI tool lets you create a new playlist or edit an existing one.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            feature={feature}>
            <Suspense fallback={<div className="animate-pulse w-full h-full bg-slate-200" />}>
              <FeatureVideo
                videoFileName={feature.videoFileName}
                title={feature.title}
              />
            </Suspense>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}
