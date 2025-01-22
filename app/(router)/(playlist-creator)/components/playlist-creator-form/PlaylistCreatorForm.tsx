'use client';
import { FaMagic } from 'react-icons/fa';
import { features } from '@/utils/constants/features';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import type { FeatureOption } from '@/types/feature';
export function PlaylistCreatorForm({}) {
  const [selectedAction, setSelectedAction] = useState<FeatureOption | ''>('');
  const onActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAction(e.target.value as FeatureOption);
    window.localStorage.setItem('selectedAction', e.target.value);
  };
  return (
    <form>
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
        <select
          name="selected action"
          value={selectedAction}
          onChange={onActionChange}
          className="flex-1 bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500  hover:ring-2 hover:ring-purple-500 transition-all duration-300 cursor-pointer">
          <option value="">Select an action</option>
          {features.map((feature) => (
            <option
              key={feature.title}
              value={feature.title}>
              {feature.title}
            </option>
          ))}
        </select>
        <Link
          href="./playlists"
          className="flex-1 bg-gray-800 text-white rounded-lg p-3 hover:bg-gray-600 transition-colors duration-300">
          Select a playlist
        </Link>

        <button className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold tracking-wide">
          <span className="flex items-center justify-center gap-2">AI My Playlist</span>
        </button>
      </div>
    </form>
  );
}
