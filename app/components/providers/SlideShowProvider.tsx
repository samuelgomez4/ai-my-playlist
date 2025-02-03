'use client';
import { createContext, createRef } from 'react';
import type { SwiperRef } from 'swiper/react';

export const SlideShowContext = createContext({
  slideShowRef: createRef<SwiperRef>(),
  slideShowTitleRef: createRef<HTMLHeadingElement>(),
});
const slideShowRef = createRef<SwiperRef>();
const slideShowTitleRef = createRef<HTMLHeadingElement>();

export const SlideShowContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SlideShowContext value={{ slideShowRef, slideShowTitleRef }}>{children}</SlideShowContext>
  );
};
