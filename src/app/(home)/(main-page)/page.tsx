import Link from 'next/link';

export const metadata = {
  title: 'Home Page',
  description: 'This is the Home page',
};

export default function HomePage() {
  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 pb-4 text-center md:text-left text-balance">
            <span className="text-white">Create a playlist</span> for every moment
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-left mb-8 max-w-prose self-center">
            Let AI curate the perfect soundtrack for any occasion. Discover new music and create
            personalized playlists effortlessly.
          </p>
          <div className="flex flex-col justify-center md:justify-start sm:flex-row gap-4 sm:items-center">
            <Link
              href={'/login'}
              className="px-8 py-3 text-center text-lg font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Get Started
            </Link>
            <a
              href="#info"
              className="text-center px-8 py-3 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-white transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
              Learn More
            </a>
          </div>
        </div>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Demo video placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <div className="text-center text-xl mt-20">
        <p className="text-gray-400 mb-2">Not sure about signing up yet?</p>
        <Link
          className="text-purple-400 hover:text-purple-300 font-semibold"
          href="/demo">
          Try our demo →
        </Link>
      </div>
    </>
  );
}
