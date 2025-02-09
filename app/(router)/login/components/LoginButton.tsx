'use client';
import { useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { ErrorModal } from './ErrorModal';

export function LoginButton() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && <ErrorModal closeModal={closeModal} />}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 border border-white/20 w-full max-w-80 md:max-w-full">
        <FaSpotify className="text-2xl text-green-500" />
        <span>Continue with Spotify</span>
      </button>
    </>
  );
}
