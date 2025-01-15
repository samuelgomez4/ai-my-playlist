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
import type { PlaylistsInfo } from '../../interfaces/playlist-info-response';
import { PlaylistCard } from '../PlaylistCard';
import { FaPlusCircle } from 'react-icons/fa';

interface Props {
  playlists: PlaylistsInfo;
}

const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  968: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  1180: {
    slidesPerView: 4,
    spaceBetween: 50,
  },
};
const _breakpoints = { 0: { slidesPerView: 1, spaceBetween: 10 }, ...breakpoints };
const _className = Object.entries(_breakpoints)
  .map(([key, value]) => {
    const { slidesPerView, spaceBetween } = value;
    return `
      @media (min-width: ${key}px) {
        .slide { 
          width: calc((100% - ${(slidesPerView - 1) * spaceBetween}px) / ${slidesPerView});
          margin-right: ${spaceBetween}px;
        }          
      }`;
  })
  .join(' ')
  .replace(/\s+/g, ' ');
export function PlaylistSlideShow({ playlists }: Props) {
  return (
    <>
      <style>{_className}</style>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        freeMode={true}
        modules={[Navigation, FreeMode]}
        breakpoints={breakpoints}
        className="mySwiper">
        {playlists.map((playlist) => (
          <SwiperSlide
            key={playlist.id}
            className="slide">
            <PlaylistCard playlist={playlist} />
          </SwiperSlide>
        ))}
        <SwiperSlide className="!h-auto slide">
          <div className="flex-shrink-0 w-56 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-all duration-300 border-2 border-dashed border-gray-700 hover:border-purple-500 h-full">
            <FaPlusCircle className="text-4xl text-purple-500 hover:text-purple-400 transition-colors duration-300" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
