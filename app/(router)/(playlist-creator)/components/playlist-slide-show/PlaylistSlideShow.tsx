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
import { useSlideShow } from '@/hooks/useSlideShow';
import { useSelectedPlaylist } from '@/hooks/useSelectedPlaylist';
import { useEffect } from 'react';

export function PlaylistSlideShow() {
  const playlists = usePlaylists();
  const { slideShowRef } = useSlideShow();
  const { selectedPlaylist } = useSelectedPlaylist();
  useEffect(() => {
    console.log(Object.keys(playlists).findIndex((id) => selectedPlaylist?.id === id));
    slideShowRef?.current?.swiper?.slideTo(
      Object.keys(playlists).findIndex((id) => selectedPlaylist?.id === id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaylist?.id, slideShowRef]);
  return (
    <div className="relative swiper-container">
      <Swiper
        ref={slideShowRef}
        id="playlist-slide-show"
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
        <SwiperSlide
          className="!h-auto"
          id="last-slide">
          <CreatePlaylistCard className="w-56" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
