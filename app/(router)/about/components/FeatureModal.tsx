import { CancelButton } from '@/components/ui/CancelButton';

interface Props {
  blendySelector: string;
  onCloseModal: () => void;
}

export function FeatureModal({ blendySelector, onCloseModal }: Props) {
  return (
    <div
      data-blendy-to={blendySelector}
      className="w-min-80 h-min-40 bg-gray-700 rounded-xl">
      <h3>Hola</h3>
      <p>esto es una prueba de como deberia servir</p>
      <CancelButton onClick={onCloseModal} />
    </div>
  );
}
