'use client';
import { FaExclamationCircle, FaMagic } from 'react-icons/fa';
import { features } from '@/utils/constants/features';
import { PlaylistSelector } from './PlaylistSelector';
import clsx from 'clsx';
import { MAX_LENGTH_PROMPT } from '@/utils/constants/constants';
import { usePersistentCreatorForm } from '@/(router)/(playlist-creator)/hooks/usePersistentCreatorForm';

export function PlaylistCreatorForm({}) {
  const {
    handleSubmit,
    register,
    isValid,
    isPlaylistRequired,
    onSubmit,
    errors,
    handleGeneratePrompt,
    isGeneratingPrompt,
  } = usePersistentCreatorForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-12">
      <div className="relative mb-6">
        <textarea
          spellCheck={false}
          maxLength={MAX_LENGTH_PROMPT}
          {...register('prompt')}
          className="w-full min-h-32 bg-gray-800 text-white rounded-lg px-4 pt-4 pb-10 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 [field-sizing:content]"
          placeholder="Describe your perfect playlist or click the magic wand to let the AI do that for you..."
        />
        <button
          type="button"
          title="generate prompt"
          onClick={handleGeneratePrompt}
          className={clsx('absolute bottom-4 right-4 text-purple-300 hover:text-purple-400', {
            'animate-bounce pointer-events-none': isGeneratingPrompt,
          })}>
          <FaMagic className="text-2xl transition-colors duration-300" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <select
          {...register('action')}
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
        <PlaylistSelector
          {...register('playlist')}
          className="flex-1"
          disabled={!isPlaylistRequired}
        />
        <button
          type="submit"
          className={clsx(
            'px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg  active:scale-95 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold tracking-wide',
            {
              'opacity-50 pointer-events-none': !isValid,
            }
          )}>
          <span className="flex items-center justify-center gap-2">AI My Playlist</span>
        </button>
      </div>
      {errors.root && (
        <div className="flex items-center text-red-500 text-md mt-2">
          <FaExclamationCircle className="w-4 h-4 mr-2" />
          {errors.root.message}
        </div>
      )}
    </form>
  );
}
