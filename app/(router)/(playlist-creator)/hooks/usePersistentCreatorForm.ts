import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { ACTIONS } from '@/utils/constants/features';
import type { FeatureOption } from '@/types/feature';
import type { PlaylistBasicInfo } from '@/types/playlist-info';
import { formSchema } from '@/schemas/formSchema';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import { generatePrompt } from '@/actions/ai/generate-prompt/generatePrompt';

interface FormInputs {
  prompt: string;
  action: FeatureOption | '';
  playlist: PlaylistBasicInfo | undefined;
}
export function usePersistentCreatorForm() {
  const [isGeneratingPrompt, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const startFromScratch = searchParams.get('create-from-scracth');
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const {
    handleSubmit,
    formState: { isValid, errors },
    register,
    getValues,
    setValue,
    watch,
    reset,
    setFocus,
    setError,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

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

  const handleGeneratePrompt = () => {
    startTransition(async () => {
      const prompt = await generatePrompt({
        action: getValues('action'),
        playlistId: getValues('playlist')?.id,
      });
      if (!prompt.ok) {
        return setError('root', { type: '500', message: prompt.message });
      }
      setValue('prompt', prompt.text ?? '', { shouldValidate: true });
    });
  };

  const onSubmit = () => {
    console.log('submit');
    reset();
    selectPlaylist(undefined);
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
  };
}
