import { FaPlayCircle, FaPlusCircle, FaMagic } from 'react-icons/fa';

export default function DashboardPage() {
  const actions = [
    'Create Playlist from Scratch',
    'Create Playlist from Selected Playlist',
    'Create New Playlist Based on Existing',
    'Add New Songs to Existing Playlist',
    'Delete Songs from Existing Playlist',
  ];

  const playlists = [
    {
      id: 1,
      name: 'Summer Vibes',
      songCount: 25,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    },
    {
      id: 2,
      name: 'Workout Mix',
      songCount: 30,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    },
    {
      id: 3,
      name: 'Chill Beats',
      songCount: 40,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    },
  ];

  return (
    <section className="md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className=" text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-4 text-balance">
          <span className="text-white">Be creative and</span> AI your playlist
        </h1>
        <p className="text-gray-300 mt-2 text-lg sm:text-xl text-pretty">
          Type a prompt and select the action you want to do
        </p>
      </div>

      <div className="relative mb-6">
        <textarea
          className="w-full h-32 bg-gray-800 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your perfect playlist or click the magic wand to let the AI do that for you..."
        />
        <button className="absolute bottom-4 right-4 text-purple-300 hover:text-purple-400">
          <FaMagic className="text-2xl transition-colors duration-300" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <select className="flex-1 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Select an action</option>
          {actions.map((action, index) => (
            <option
              key={index}
              value={action}>
              {action}
            </option>
          ))}
        </select>

        <select className="flex-1 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Select a playlist</option>
          {playlists.map((playlist) => (
            <option
              key={playlist.id}
              value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>

        <button className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold tracking-wide">
          <span className="flex items-center justify-center gap-2">AI My Playlist</span>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Playlists</h2>
        <div className="relative">
          <div
            className="flex gap-6 overflow-x-hidden scroll-smooth pb-4 px-8"
            style={{
              transition: 'transform 0.5s ease-in-out',
              width: `${(playlists.length + 1) * (266 + 24)}px`,
            }}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex-shrink-0 w-[250px] bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <div className="relative group">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaPlayCircle className="text-white text-4xl" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-800">
                  <h3 className="text-white font-semibold mb-1 text-lg">{playlist.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{playlist.songCount} songs</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
                      Select
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-800 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[250px] bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-300 border-2 border-dashed border-gray-700 hover:border-purple-500 h-[350px]">
              <FaPlusCircle className="text-4xl text-purple-500 hover:text-purple-400 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
