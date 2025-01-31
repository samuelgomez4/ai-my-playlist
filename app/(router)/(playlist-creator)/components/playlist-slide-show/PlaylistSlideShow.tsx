'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slide-styles.css';

import { FreeMode, Navigation } from 'swiper/modules';
import { PlaylistCard } from './PlaylistCard';
import { CreatePlaylistCard } from '@/components/playlist/CreatePlaylistCard';
import { usePlaylists } from '@/hooks/usePlaylists';

export function PlaylistSlideShow() {
  const playlists = usePlaylists();
  return (
    <div className="relative swiper-container">
      <Swiper
        slidesPerView={'auto'}
        navigation={true}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        className="mySwiper">
        {Object.values(playlists).map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </SwiperSlide>
        ))}
        <SwiperSlide className="!h-auto">
          <CreatePlaylistCard className="w-56" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
