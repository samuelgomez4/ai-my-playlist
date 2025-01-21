interface Props {
  closeModal: () => void;
}

export function ErrorModal({ closeModal }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 p-8 rounded-lg max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-white mb-4">We're sorry</h3>
        <p className="text-gray-300 mb-6">
          Right now AIMyPlaylist only works with Youtube Music. Spotify option is still under
          development.
        </p>
        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          onClick={closeModal}>
          Got it
        </button>
      </div>
    </div>
  );
}
