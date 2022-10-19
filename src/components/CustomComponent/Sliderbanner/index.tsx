import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
import DefaultImage from "../../../../public/images/product_1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { IconPrevProduct, IconNextProduct } from "@components/Icons";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import { Button, Typography } from "@mui/material";
import SearchInput from "../SearchInput";
import ModalAdvanSearch from "@components/LayoutIndex/HomeComponent/ModalAdvanSearch";

const WrapBanner = styled.div`
position: absolute;
z-index: 100;
width: 100%;
height: 644px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(2, 14, 22, 0.486) 43.23%,
    rgba(3, 6, 9, 0.729) 100%
  );

  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextBanner = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  /* Brand/Text */

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
`;

const WrapSlide = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(2, 14, 22, 0.486) 43.23%,
    rgba(3, 6, 9, 0.729) 100%
  );
`;
const CardContainer = styled.div`
  height: 224px;
  width: 360px;
  background-size: cover;
  border-radius: 10px;
`;

SwiperCore.use([Autoplay, Pagination, Navigation]);
const Sliderbanner = ({ data }: { data?: any[] }) => {

	
  const renderItems = useMemo(() => {
    return data?.map((el, index) => (
      <SwiperSlide key={index}>
        <CardContainer>
          <ImageWithHideOnError
            className="logo"
            src={el.image ?? DefaultImage}
			style={""}
            fallbackSrc={DefaultImage}
            width={1500}
            height={381}
            priority
            layout="fill"
            unoptimized={true}
          />
        </CardContainer>
      </SwiperSlide>
    ));
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 60,
        marginTop: 100,
        width: "100%",
      }}
    >
      <WrapSlide>
        <Swiper
          spaceBetween={10}
          speed={3000}
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
		  modules={[Pagination]}
		  pagination={{
			el: ".swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + `${Number(index) < 10 ? "0" : ""}` + (index + 1)  + "</span>";
			}
		  }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          //   modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{ width: "100%", height: 644 }}
        >
          {renderItems}
        </Swiper>
      </WrapSlide>

	  <WrapBanner>
        <ContainerBody>
          <div style={{ marginBottom: 20 }}>
            <TextBanner>SỐNG XANH THỊNH VƯỢNG</TextBanner>
            <TextBanner>ĐẤT VÀNG PHỒN VINH</TextBanner>
			<div>
			<div className="swiper-pagination"></div>
			</div>
          </div>

          <SearchInput
            placholder="Nhập tên dự án, địa chỉ hoặc thành phố"
            width={723}
            height={60}
          />

          <div style={{ marginTop: 19 }}>
            <ModalAdvanSearch />
          </div>
        </ContainerBody>
      </WrapBanner>
    </div>
  );
};
export default Sliderbanner;
