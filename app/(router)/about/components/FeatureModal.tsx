import { CancelButton } from '@/components/ui/CancelButton';

interface Props {
  blendySelector: string;
  onCloseModal: () => void;
  title: string;
  children: React.ReactNode;
  description: string;
}

export function FeatureModal({
  blendySelector,
  onCloseModal,
  title,
  children,
  description,
}: Props) {
  return (
    <div
      data-blendy-to={blendySelector}
      className="w-min-80 h-min-40 bg-gray-700 rounded-xl m-4 relative">
      <div className="flex flex-col gap-8 px-4 py-8 lg:flex-row lg:p-10 overflow">
        <div className="flex flex-col gap-2 w-full max-w-lg lg:max-w-md">
          <h3 className="text-white font-bold text-lg sm:text-2xl">{title}</h3>
          <p className="text-gray-300 text-base sm:text-lg text-pretty">{description}</p>
        </div>
        <div className="w-full max-w-lg rounded-xl overflow-hidden">{children}</div>
      </div>
      <CancelButton
        onClick={onCloseModal}
        className="absolute top-3 right-3"
      />
    </div>
  );
}
