import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore,{ Autoplay, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";


// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { IconPrevProduct,IconNextProduct } from "@components/Icons";

const WrapSlide = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const CardContainer = styled.div`
  height: 224px;
  width: 360px;
  background-size: cover;
  border-radius: 10px;
`;

SwiperCore.use([ Autoplay,Pagination,Navigation ]);
export default function SliderProductComponent() {

  return (
    <WrapSlide>
      <IconPrevProduct style={{ cursor: "pointer" ,position: 'absolute', zIndex: 10, marginLeft: 10}} />
      <Swiper
        spaceBetween={10}
		speed={1000}
        centeredSlides={true}
        slidesPerView={1}
        navigation={{
          prevEl: ".icon-PrevProduct",
          nextEl: ".icon-NextProduct",
		// @ts-ignore
          clickable: true,
        }}
        observer={true}
        observeParents={true}
        // modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ width: 703 ,height: 381}}
		
      >
        <SwiperSlide>
          <CardContainer>
            <img
              src="/images/product_1.png"
              alt="Picture of the author"
              width={703}
              height={381}
            />
          </CardContainer>
        </SwiperSlide>
		<SwiperSlide>
		<CardContainer>
            <img
              src="/images/product_1.png"
              alt="Picture of the author"
              width={703}
              height={381}
            />
          </CardContainer>
        </SwiperSlide>
		<SwiperSlide>
		<CardContainer>
            <img
              src="/images/product_1.png"
              alt="Picture of the author"
              width={703}
              height={381}
            />
          </CardContainer>
        </SwiperSlide>
      </Swiper>
      <IconNextProduct style={{ cursor: "pointer",position: 'absolute', zIndex: 10 , right: 0, marginRight: 10}} />
    </WrapSlide>
  );
}
