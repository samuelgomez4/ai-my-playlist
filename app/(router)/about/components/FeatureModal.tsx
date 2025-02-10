interface Props {
  blendySelector: string;
}

export function FeatureModal({ blendySelector }: Props) {
  return (
    <div className="w-full h-full fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        data-blendy-to={blendySelector}
        className="w-min-80 h-min-40 bg-gray-700 rounded-xl">
        <h3>Hola</h3>
        <p>esto es una prueba de como deberia servir</p>
      </div>
    </div>
  );
}
