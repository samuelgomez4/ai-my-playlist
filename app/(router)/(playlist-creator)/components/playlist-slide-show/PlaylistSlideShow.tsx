'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slide-styles.css';

// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import { PlaylistCard } from './PlaylistCard';
import { FaPlusCircle } from 'react-icons/fa';
import type { PlaylistsInfo } from '@/types/playlist-info-response';

interface Props {
  playlists: PlaylistsInfo;
}

export function PlaylistSlideShow({ playlists }: Props) {
  return (
    <div className="relative swiper-container">
      <Swiper
        slidesPerView={'auto'}
        navigation={true}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        className="mySwiper">
        {playlists.map((playlist) => (
          <SwiperSlide key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </SwiperSlide>
        ))}
        <SwiperSlide className="!h-auto">
          <div className="w-56 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-300 border-2 border-dashed border-gray-700 hover:border-purple-500 h-full">
            <FaPlusCircle className="text-4xl text-purple-500 hover:text-purple-400 transition-colors duration-300" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
