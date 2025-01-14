'use client';
import { RxReset } from 'react-icons/rx';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dv">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        500
      </h1>
      <p className="text-2xl text-white mb-2">Server Error</p>
      <p className="text-gray-400 mb-8 max-w-md mx-auto text-center text-pretty">
        Oops, Something went wrong! {error.message}.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2">
        <RxReset className="text-xl" />
        Try again
      </button>
    </div>
  );
}
