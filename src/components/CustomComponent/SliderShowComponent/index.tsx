import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import Mask1 from "../../../../public/images/mask_g_1.png";
import Mask2 from "../../../../public/images/mask_g_2.png";
import Mask3 from "../../../../public/images/mask_g_3.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { IconCarouelHLeftArrow } from "@components/Icons";
import { IconCarouelHRightArrow } from "@components/Icons";
const WrapSlide = styled.div`
  width: 1245px;
  display: flex;
  align-items: center;
`;
const CardContainer = styled.div`
  height: 224px;
  width: 360px;
  background-size: cover;
  border-radius: 10px;
`;

export default function SliderShowComponent() {

  return (
    <WrapSlide>
      <IconCarouelHLeftArrow style={{ cursor: "pointer" }} />
      <Swiper
        spaceBetween={10}
		speed={1000}
        centeredSlides={true}
        slidesPerView={3}
		
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}	
        navigation={{
          prevEl: ".icon-LeftArow",
          nextEl: ".icon-rightArow",
		// @ts-ignore
          clickable: true,
        }}
        observer={true}
        observeParents={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ width: 1113 }}
		
      >
        <SwiperSlide>
          <CardContainer>
            <Image
              src={Mask1}
              alt="Picture of the author"
              width={360}
              quality={100}
              height={224}
              layout="fixed"
            />
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <Image
              src={Mask2}
              alt="Picture of the author"
              width={360}
              quality={100}
              height={224}
              layout="fixed"
            />
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <Image
              src={Mask3}
              alt="Picture of the author"
              width={360}
              quality={100}
              height={224}
              layout="fixed"
            />
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <Image
              src={Mask1}
              alt="Picture of the author"
              width={360}
              quality={100}
              height={224}
              layout="fixed"
            />
          </CardContainer>
        </SwiperSlide>
      </Swiper>
      <IconCarouelHRightArrow style={{ cursor: "pointer" }} />
    </WrapSlide>
  );
}
