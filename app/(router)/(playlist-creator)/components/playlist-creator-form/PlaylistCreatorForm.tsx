'use client';
import { FaMagic } from 'react-icons/fa';
import { ACTIONS, features } from '@/utils/constants/features';
import type { FeatureOption } from '@/types/feature';
import { useForm } from 'react-hook-form';
import type { PlaylistBasicInfo } from '@/types/playlist-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/formSchema';
import { useEffect } from 'react';
import { MAX_LENGTH_PROMPT } from '@/utils/constants/constants';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import { PlaylistSelector } from './PlaylistSelector';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

interface FormInputs {
  prompt: string;
  action: FeatureOption | '';
  playlist: PlaylistBasicInfo | undefined;
}

export function PlaylistCreatorForm({}) {
  const searchParams = useSearchParams();
  const startFromScratch = searchParams.get('create-from-scracth');
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const {
    handleSubmit,
    formState: { isValid },
    register,
    getValues,
    setValue,
    watch,
    reset,
    setFocus,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  if (startFromScratch) {
    // setValue('action', ACTIONS.createFromScratch);
  }

  const isPlaylistRequired = getValues('action') !== ACTIONS.createFromScratch;

  watch(['playlist', 'action']);

  useEffect(() => {
    setValue('prompt', window.localStorage.getItem('prompt') ?? '');
    setValue('action', (window.localStorage.getItem('action') as FeatureOption) ?? '');
    setFocus('prompt');
    if (startFromScratch) {
      setValue('action', ACTIONS.createFromScratch);
      window.history.pushState({}, '', '/');
    }
  }, [setValue, setFocus, startFromScratch]);

  useEffect(() => {
    const subscription = watch((data) => {
      window.localStorage.setItem('prompt', data.prompt ?? '');
      window.localStorage.setItem('action', data.action ?? '');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setValue('playlist', selectedPlaylist, { shouldValidate: true });
  }, [selectedPlaylist, setValue]);

  const onSubmit = () => {
    reset();
    selectPlaylist(undefined);
    window.localStorage.removeItem('prompt');
    window.localStorage.removeItem('action');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-12">
      <div className="relative mb-6">
        <textarea
          maxLength={MAX_LENGTH_PROMPT}
          {...register('prompt')}
          className="w-full min-h-32 bg-gray-800 text-white rounded-lg px-4 pt-4 pb-10 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 [field-sizing:content]"
          placeholder="Describe your perfect playlist or click the magic wand to let the AI do that for you..."
        />
        <button className="absolute bottom-4 right-4 text-purple-300 hover:text-purple-400">
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
    </form>
  );
}
