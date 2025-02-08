import { features } from '@/utils/constants/features';
import { FeatureCard } from './FeatureCard';

export function FeaturesGrid({}) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center text-balance">
        With AIMyPlaylist you can connect your YouTube Music account and:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature) => (
          <FeatureCard
            feature={feature}
            key={feature.title}
          />
        ))}
      </div>
    </>
  );
}
