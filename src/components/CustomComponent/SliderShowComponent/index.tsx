import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
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
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import ImageWithHideOnErrorOffers from "hooks/ImageWithHideOnErrorOffers";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";
const WrapSlide = styled.div`

display: flex;
align-items: center;
`;
const CardContainer = styled.div`
  height: 224px;
  width: 360px;
  background-size: cover;
  border-radius: 10px;
`;
SwiperCore.use([Autoplay, Pagination, Navigation]);
export default function SliderShowComponent() {
	const Router = useRouter();
  const { SearchSpecialOffer } = useSelector(
    (state: RootState) => state.specialoffers
  );
  const matches = useMediaQuery('(max-width:1110px)');
  return (
    <>
      {SearchSpecialOffer && SearchSpecialOffer.length > 0 ? (
        <WrapSlide>
          <IconCarouelHLeftArrow style={{ cursor: "pointer", marginRight: 5 }} />
          <Swiper
            spaceBetween={10}
            speed={5000}
            centeredSlides={matches ? false : true}
            slidesPerView={matches ? 2 : 3}
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
            // modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper-CTUD"
            style={{ width: 1133 }}
          >
            {SearchSpecialOffer.map((item, index) => (
				<SwiperSlide key={index}>
					<div
					  onClick={() => Router.push(`/sales/${item.id}`)}
					  style={{ cursor: "pointer" }}
					>
                  <CardContainer>
                    {/* {console.log(item.avatar)} */}
                    {/* <Image
                    src={item.avatar ? item.avatar : Mask3}
                    alt="Picture of the author"
                    width={360}
                    quality={100}
                    height={224}
                    layout="fixed"
                  /> */}
                    <ImageWithHideOnErrorOffers
                      className="logo"
                      src={item.avatar ? item.avatar : Mask3}
                      fallbackSrc={Mask3}
                      width={350}
                      height={224}
                      priority
                      layout="fixed"
                      unoptimized={true}
                    />
                  </CardContainer>
              </div>
                </SwiperSlide>
            ))}

            {/* <SwiperSlide>
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
		  </SwiperSlide> */}
            {/* <SwiperSlide>
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
		  </SwiperSlide> */}
          </Swiper>
          <IconCarouelHRightArrow style={{ cursor: "pointer" }} />
        </WrapSlide>
      ) : (
        <></>
      )}
    </>
  );
}
