import { CustomImage } from '@/components/ui/CustomImage';
import type { IconType } from 'react-icons';

interface Props {
  feature: {
    Icon: IconType;
    title: string;
    description: string;
    videoUrl: string;
  };
}
export function FeatureCard({ feature }: Props) {
  const { Icon, title, description, videoUrl } = feature;
  return (
    <article className="bg-gray-800  rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700">
      <div className="flex flex-col items-center">
        <Icon className="text-4xl text-purple-500" />
        <h3 className="text-xl font-semibold text-white mt-4 mb-2 text-balance text-center">
          {title}
        </h3>
        <p className="text-gray-300 text-center mb-4 text-pretty max-w-prose">{description}</p>
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <CustomImage
            src={videoUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}
