import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore,{ Autoplay, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import DefaultImage from "../../../../public/images/product_1.png"


// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { IconPrevProduct,IconNextProduct } from "@components/Icons";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";

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
const SliderProductComponent = ({data}:{data?:string[]}) => {
const renderItems=useMemo(()=>{
  return data?.map((el,index)=>(
    <SwiperSlide key={index}>
        <CardContainer style={{backgroundColor:'red'}}>
          <ImageWithHideOnError
            className="logo"
            src={el??DefaultImage}
            fallbackSrc={DefaultImage}
            width={703}
            height={381}
            priority
            layout="fill"
            unoptimized={true}
          />
        </CardContainer>
      </SwiperSlide>
  ))
},[data])
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
        style={{ width: '100%' ,height: 381}}
		
      >
        {renderItems}
      </Swiper>
      <IconNextProduct style={{ cursor: "pointer",position: 'absolute', zIndex: 10 , right: 0, marginRight: 10}} />
    </WrapSlide>
  );
}
export default SliderProductComponent;