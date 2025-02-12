'use client';

import { Children } from 'react';
import { Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  children: React.ReactNode;
}

export function VideoSlideShow({ children: videos }: Props) {
  return (
    <>
      <Swiper
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {Children.map(videos, (video, index) => (
          <SwiperSlide key={index}>{video}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
