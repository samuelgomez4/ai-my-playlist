import { SlideShowContext } from '@/components/providers/SlideShowProvider';
import { useContext } from 'react';

export const useSlideShow = () => {
  return useContext(SlideShowContext);
};
