export const metadata = {
  title: 'AIMyPlaylist - About',
  description: 'Learn all you can do with AIMyPlaylist an AI-powered playlist generator and editor',
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-left mb-16">
        <h2 className="text-3xl font-bold text-white mb-8">How does it work?</h2>
        <div className="space-y-6 text-gray-300 text-lg">
          <p>
            YouTube Music, while offering an AI-powered station, does not have a tool that allows
            users to create or modify their playlists using AI.
          </p>
          <p className="py-4">
            On the other hand, Spotify introduces a new feature that enables users to create
            playlists from a prompt. Essentially, it generates a playlist from scratch, and users
            can make further modifications based on this newly created playlist. However, there is
            no functionality that allows users to modify an existing playlist from their profile
            using AI or to create a new playlist that includes both a prompt and an existing
            playlist as context. Additionally, Spotify's AI feature is limited to premium users and
            is only available in a few countries.
          </p>
          <p className="text-xl font-semibold text-purple-400">
            That's why AI My Playlist offers these powerful features to create or modify your
            playlists:
          </p>
        </div>
      </div>
    </>
  );
}
