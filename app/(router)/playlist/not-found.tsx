import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-12 px-4">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        404
      </h1>
      <p className="text-2xl text-white mb-2">Playlist Not Found</p>
      <p className="text-gray-400 mb-8 max-w-md mx-auto text-center text-pretty">
        Oops! The playlist you are looking for does not exist or is temporarily unavailable.
      </p>
      <Link
        href="/demo"
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2">
        <FaHome className="text-xl" />
        Back to Home
      </Link>
    </div>
  );
}
