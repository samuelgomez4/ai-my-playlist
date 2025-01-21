'use client';
import { useCallback, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';
import { ErrorModal } from './components/ErrorModal';

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);
  return (
    <>
      {showModal && <ErrorModal closeModal={closeModal} />}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fade-in text-center text-balance md:text-wrap">
            <span className="text-white">Transform Your Music </span>Experience with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center text-pretty">
            Let AI curate the perfect soundtrack for any occasion. Sign in to start your
            personalized music journey.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md items-center">
            <button className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20 w-full max-w-80 md:max-w-full">
              <SiYoutubemusic className="text-2xl text-red-600" />
              <span>Continue with Youtube Music</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center space-x-3 px-6 py-3 text-lg font-semibold text-gray-400 bg-gray-700/50 rounded-lg cursor-not-allowed transition-colors duration-300 w-full max-w-80 md:max-w-full">
              <FaSpotify className="text-2xl " />
              <span>Continue with Spotify</span>
            </button>

            {/* START: Updated Code (Line 54) */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">Not sure about signing up yet?</p>
              <button className="text-purple-400 hover:text-purple-300 font-semibold">
                Try our demo →
              </button>
            </div>
            {/* END: Updated Code (Line 57) */}
          </div>
        </div>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl h-screen md:h-[calc(100vh-8rem)]">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Music visualization"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      </section>
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
