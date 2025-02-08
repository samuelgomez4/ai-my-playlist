import Link from 'next/link';

interface Props {
  closeModal: () => void;
}

export function ErrorModal({ closeModal }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 p-8 rounded-lg max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-white mb-4">We're Sorry</h3>
        <p className="text-gray-300 mb-6">
          Due to Spotify's quota policies, this option is still under development. To give you an
          idea of how it will work in the future you can try our{' '}
          <Link
            href="/"
            className="text-purple-400">
            demo
          </Link>
          .
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
