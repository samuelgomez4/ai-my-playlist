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
  const { Icon, title } = feature;
  return (
    <article className="bg-gray-700 rounded-xl py-5 px-9 shadow-xl border border-gray-700 max-w-80 min-h-40 w-full cursor-pointer">
      <div className="flex flex-col items-center">
        <Icon className="text-4xl text-purple-500" />
        <h3 className="text-xl font-semibold text-white mt-4 text-balance text-center">{title}</h3>
      </div>
    </article>
  );
}
