import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { ACTIONS } from '@/utils/constants/features';
import type { FeatureOption } from '@/types/feature';
import type { PlaylistBasicInfo } from '@/types/playlist';
import { formSchema } from '@/schemas/formSchema';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import { generatePrompt } from '@/actions/ai/generate-prompt/generatePrompt';
import { usePlaylistsStore } from '@/store/playlists-store';
import { generatePlaylistDetails } from '@/actions/ai/generate-playlist-details/generatePlaylistDetails';
import { generateSongsSuggestions } from '@/actions/ai/generate-songs-suggestions/generateSongsSuggestions';
import { getSongsToAdd } from '@/actions/spotifyAPI/getSongsToAdd';
import { generateIdsToAdd } from '@/actions/ai/generate-ids-to-add/generateIdsToAdd';
import { generateIdsToRemove } from '@/actions/ai/generate-ids-to-remove/generateIdsToRemove';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useSlideShow } from '@/hooks/useSlideShow';
import { refuseOffTopicAnswer } from '@/actions/ai/utils/constants/constants';

interface FormInputs {
  prompt: string;
  action: FeatureOption | '';
  playlist: PlaylistBasicInfo | undefined;
}
export function usePersistentCreatorForm() {
  const [isGeneratingPrompt, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const startFromScratch = searchParams.get('create-from-scracth');
  const { selectedPlaylist } = useSelectedPlaylist();
  const { playlists } = usePlaylists();
  const createPlaylist = usePlaylistsStore((state) => state.createPlaylist);
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);
  const addSongsToPlaylist = usePlaylistsStore((state) => state.addSongsToPlaylist);
  const deleteSongsFromPlaylist = usePlaylistsStore((state) => state.deleteSongsFromPlaylist);
  const { slideShowRef, slideShowTitleRef } = useSlideShow();

  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    register,
    getValues,
    setValue,
    watch,
    setFocus,
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });
  const currentPlaylistSongs = playlists[getValues('playlist.id')]?.songs ?? [];
  const isPlaylistRequired = getValues('action') !== ACTIONS.createFromScratch;

  watch(['playlist', 'action']);

  useEffect(() => {
    setValue('prompt', window.localStorage.getItem('prompt') ?? '');
    setValue('action', (window.localStorage.getItem('action') as FeatureOption) ?? '');
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

  const handleGeneratePrompt = () => {
    clearErrors();
    startTransition(async () => {
      const prompt = await generatePrompt({
        action: getValues('action'),
        songs: currentPlaylistSongs,
      });
      if (!prompt.ok) {
        return setError('root', { type: '500', message: prompt.message });
      }
      setValue('prompt', prompt.text ?? '', { shouldValidate: true });
    });
  };

  const onSubmit = async (data: FormInputs) => {
    const selectedPlaylistSongs = playlists[data.playlist?.id ?? '']?.songs ?? [];
    if (
      data.action === ACTIONS.createFromScratch ||
      data.action === ACTIONS.createBasedOnSelected
    ) {
      const playlistDetailsResult = await generatePlaylistDetails(data.prompt);
      if (!playlistDetailsResult.ok) {
        return setError('root', { type: '500', message: playlistDetailsResult.message });
      }
      const newPlaylsitId = createPlaylist({
        name: playlistDetailsResult.detailsObject?.name ?? 'Playlist',
        description: playlistDetailsResult.detailsObject?.description ?? 'This is a new playlist',
      });
      const songsSuggestionsResult = await generateSongsSuggestions({
        prompt: data.prompt,
        songs: selectedPlaylistSongs,
      });
      if (!songsSuggestionsResult.ok) {
        deletePlaylist(newPlaylsitId);
        return setError('root', { type: '500', message: songsSuggestionsResult.message });
      }
      const songsToAddResult = await getSongsToAdd(songsSuggestionsResult.songsSuggestionsList!);
      if (!songsToAddResult.ok) {
        deletePlaylist(newPlaylsitId);
        return setError('root', { type: '500', message: songsToAddResult.message });
      }
      if (songsToAddResult?.songsToAdd?.length === 0) {
        deletePlaylist(newPlaylsitId);
        return setError('root', { type: '500', message: refuseOffTopicAnswer });
      }
      addSongsToPlaylist(newPlaylsitId, songsToAddResult.songsToAdd!);
      slideShowTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
      slideShowRef?.current?.swiper?.slideTo(Object.keys(playlists).length);
    } else if (data.action === ACTIONS.filterSelected) {
      const playlistDetailsResult = await generatePlaylistDetails(data.prompt);
      if (!playlistDetailsResult.ok) {
        return setError('root', { type: '500', message: playlistDetailsResult.message });
      }
      const newPlaylsitId = createPlaylist({
        name: playlistDetailsResult.detailsObject?.name ?? 'Playlist',
        description: playlistDetailsResult.detailsObject?.description ?? 'This is a new playlist',
      });
      const idsToAddResult = await generateIdsToAdd({
        prompt: data.prompt,
        songs: selectedPlaylistSongs,
      });
      if (!idsToAddResult.ok) {
        deletePlaylist(newPlaylsitId);
        return setError('root', { type: '500', message: idsToAddResult.message });
      }
      const idsToAdd = idsToAddResult.idsToAddList ?? [];
      const songsToAdd = selectedPlaylistSongs.filter((song) => idsToAdd.includes(song.id));
      if (songsToAdd.length === 0) {
        deletePlaylist(newPlaylsitId);
        return setError('root', { type: '500', message: refuseOffTopicAnswer });
      }
      addSongsToPlaylist(newPlaylsitId, songsToAdd);
      slideShowTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
      slideShowRef?.current?.swiper?.slideTo(Object.keys(playlists).length);
    } else if (data.action === ACTIONS.addNewSongs) {
      const songsSuggestionsResult = await generateSongsSuggestions({
        prompt: data.prompt,
        songs: selectedPlaylistSongs,
      });
      if (!songsSuggestionsResult.ok) {
        return setError('root', { type: '500', message: songsSuggestionsResult.message });
      }
      const songsToAddResult = await getSongsToAdd(songsSuggestionsResult.songsSuggestionsList!);
      if (!songsToAddResult.ok) {
        return setError('root', { type: '500', message: songsToAddResult.message });
      }
      if (songsToAddResult?.songsToAdd?.length === 0) {
        return setError('root', { type: '500', message: refuseOffTopicAnswer });
      }
      addSongsToPlaylist(data.playlist?.id ?? '', songsToAddResult.songsToAdd!);
      slideShowTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
      slideShowRef?.current?.swiper?.slideTo(
        Object.keys(playlists).findIndex((id) => selectedPlaylist?.id === id)
      );
    } else if (data.action === ACTIONS.deleteSongs) {
      const idsToRemoveResult = await generateIdsToRemove({
        prompt: data.prompt,
        songs: selectedPlaylistSongs,
      });
      if (!idsToRemoveResult.ok) {
        return setError('root', { type: '500', message: idsToRemoveResult.message });
      }
      const idsToRemove = idsToRemoveResult.idsToRemoveList ?? [];
      if (idsToRemove.length === 0) {
        return setError('root', { type: '500', message: refuseOffTopicAnswer });
      }
      deleteSongsFromPlaylist(data.playlist?.id ?? '', idsToRemove);
      slideShowTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
      slideShowRef?.current?.swiper?.slideTo(
        Object.keys(playlists).findIndex((id) => selectedPlaylist?.id === id)
      );
    } else {
      setError('root', { type: '500', message: 'Invalid action' });
    }
    setValue('prompt', '', { shouldValidate: true });
    setValue('action', '', { shouldValidate: true });
    window.localStorage.removeItem('prompt');
    window.localStorage.removeItem('action');
  };

  return {
    handleSubmit,
    register,
    isValid,
    isPlaylistRequired,
    onSubmit,
    errors,
    handleGeneratePrompt,
    isGeneratingPrompt,
    isSubmitting,
  };
}
