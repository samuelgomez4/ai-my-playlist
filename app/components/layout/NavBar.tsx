import Link from 'next/link';
import { AIMPLogo } from '../logo/AIMPLogo';

export function NavBar() {
  return (
    <nav className="bg-gray-900/75 px-4 py-3 backdrop-blur-md sticky w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-4">
          <AIMPLogo className="w-10 h-10" />
          <span className="text-xl font-bold text-white hidden sm:inline">AIMyPlaylist</span>
        </Link>

        <div className="flex items-center">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-white rounded-full hover:bg-purple-700 transition-colors duration-300">
            Demo
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-semibold text-white rounded-full hover:bg-purple-700 transition-colors duration-300">
            Learn more
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300 ml-4">
            Log in
          </Link>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
