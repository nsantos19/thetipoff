import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {useRouter} from 'next/router'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Flicker(props) {
  console.log(props)
  const router = useRouter();
  
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        
        autoplay={{
          delay: 2600,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[0,1,2].map(i =>(
        <SwiperSlide onClick={() => router.push('/' + props.posts[i]._id)}> {props.posts[i].title}</SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
