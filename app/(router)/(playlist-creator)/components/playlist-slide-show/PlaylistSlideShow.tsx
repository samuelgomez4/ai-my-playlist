'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import './styles.css';

import { FreeMode, Navigation } from 'swiper/modules';
import { PlaylistCard } from './PlaylistCard';
import { PlaylistCardSkeleton } from './PlaylistCardSkeleton';
import { CreatePlaylistCard } from '@/components/ui/playlist/CreatePlaylistCard';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useSlideShow } from '@/hooks/useSlideShow';

export function PlaylistSlideShow() {
  const { playlists, isLoading } = usePlaylists();
  const { slideShowRef } = useSlideShow();
  return (
    <div className="relative swiper-container lg:mx-8">
      <Swiper
        ref={slideShowRef}
        id="playlist-slide-show"
        slidesPerView={'auto'}
        navigation={true}
        freeMode={true}
        cssMode={true}
        modules={[Navigation, FreeMode]}
        className="mySwiper">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <PlaylistCardSkeleton />
              </SwiperSlide>
            ))
          : Object.values(playlists).map((playlist) => (
              <SwiperSlide key={playlist.id}>
                <PlaylistCard playlist={playlist} />
              </SwiperSlide>
            ))}
        <SwiperSlide
          className="!h-auto"
          id="last-slide">
          <CreatePlaylistCard className="w-56 min-h-96" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
