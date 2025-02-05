import { FaUserCircle } from 'react-icons/fa';
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
          <span className="text-xl font-bold text-white sm:hidden">AIMP</span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            Demo
          </button>
          {/* {isSignedIn ? (
              <div className="relative group">
                <CustomImage
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40"
                  alt="User profile"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={handleSignIn}
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40';
                  }}
                />
              </div>
              <div className="relative group">
                <CustomImage
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40"
                  alt="User profile"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={handleSignIn}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40";
                  }}
                />
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john.doe@example.com</p>
                  </div>
                  <div className="border-t border-gray-700 my-2"></div>
                  <button onClick={handleSignIn} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : ( */}
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            <FaUserCircle className="text-lg" />
            <span>Sign In</span>
          </Link>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
