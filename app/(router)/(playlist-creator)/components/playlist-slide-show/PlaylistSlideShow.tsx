'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slide-styles.css';

import { FreeMode, Navigation, Mousewheel } from 'swiper/modules';
import { PlaylistCard } from './PlaylistCard';
import { CreatePlaylistCard } from '@/components/playlist/CreatePlaylistCard';
import { usePlaylists } from '@/hooks/usePlaylists';

export function PlaylistSlideShow() {
  const playlists = usePlaylists();

  return (
    <div className="relative swiper-container">
      <Swiper
        id="playlist-slide-show"
        slidesPerView={'auto'}
        navigation={true}
        freeMode={true}
        mousewheel={{ enabled: true, sensitivity: 5 }}
        modules={[Navigation, FreeMode, Mousewheel]}
        className="mySwiper">
        {Object.values(playlists).map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </SwiperSlide>
        ))}
        <SwiperSlide
          className="!h-auto"
          id="last-slide">
          <CreatePlaylistCard className="w-56" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
