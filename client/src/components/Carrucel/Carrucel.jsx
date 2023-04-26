import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import photos from "../../assets/photos-carrucel/photos";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full h-[480px] object-fill" src={photos.foto1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-[480px] object-fill" src={photos.foto2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-[480px] object-fill" src={photos.foto3} alt="" />
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}