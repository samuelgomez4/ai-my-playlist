'use client';
import { FaMagic } from 'react-icons/fa';
import { features } from '@/utils/constants/features';
import { Link } from 'next-view-transitions';
import type { FeatureOption } from '@/types/feature';
import { useSelectedPlaylistStore } from '@/store/selected-playlist-store';
import { useForm } from 'react-hook-form';
import type { PlaylistBasicInfo } from '@/types/playlist-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/formSchema';
import { useEffect } from 'react';

interface FormInputs {
  prompt: string;
  action: FeatureOption | '';
  playlist: PlaylistBasicInfo | undefined;
}

export function PlaylistCreatorForm({}) {
  const selectedPlaylist = useSelectedPlaylistStore((store) => store.selectedPlaylist);
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      prompt: window.localStorage.getItem('prompt') ?? '',
      action: (window.localStorage.getItem('action') as FeatureOption) ?? '',
      playlist: selectedPlaylist,
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const subscription = watch((data) => {
      window.localStorage.setItem('prompt', data.prompt ?? '');
      window.localStorage.setItem('action', data.action ?? '');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setValue('playlist', selectedPlaylist);
  }, [selectedPlaylist, setValue]);

  return (
    <form>
      <div className="relative mb-6">
        <textarea
          {...register('prompt')}
          className="w-full h-32 bg-gray-800 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your perfect playlist or click the magic wand to let the AI do that for you..."
        />
        <button className="absolute bottom-4 right-4 text-purple-300 hover:text-purple-400">
          <FaMagic className="text-2xl transition-colors duration-300" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
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
        <Link
          {...register(
            'playlist' /* , {
            required: true,
            validate: {
              isPlaylistSelected: () =>
                Boolean(getValues('playlist')) || 'You must select a playlist',
            },
          } */
          )}
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
