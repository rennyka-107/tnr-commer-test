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
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

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
const WrapContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 50px;
  height: 200px;
  align-items: flex-start;
`;
const WrapIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-width: 150px;
  gap: 20px;
`;
const WrapIcon = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
  background-size: contain;
  :hover {
    background-image: url(${(props) => props.theme["icon"]}) !important;
    background-size: contain;
  }
`;

const TextBottomIcon = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  /* Brand/Main color */

  color: #1b3459;
`;
const TextTitle = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  /* identical to box height */

  /* Brand/Main color */

  color: #1b3459;
  margin-bottom: 60px;
`;
SwiperCore.use([Autoplay, Pagination, Navigation]);
const SliderCategoryIndex = ({ data }: { data?: any[] }) => {
  const router = useRouter();
  const { listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const menuBarProjectType = listMenuBarProjectType?.filter(
    (item) => item.id !== "1"
  );
  const onClickProduct = async (projectTypeId) => {
    const paramsSearch = {
      page: 0,
      size: 10,
    };

    const searchList = {
      projectId: "",
      provinceId: "",
      projectTypeId: projectTypeId,
    };
    // try {
    //   const response = await searchListProductByProjectIdApi(paramsSearch, searchList);
    //   dispatch(getListProduct(response.responseData));

    //   if (response.responseCode === "00") {
    router.replace(`/productTNR?provinceId=&&projectTypeId=${projectTypeId}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const renderItems = useMemo(() => {
    console.log(menuBarProjectType);
    return menuBarProjectType?.map((item, index) => (
      <SwiperSlide key={index}>
        <WrapContainer>
          <WrapIconContainer
            key={index}
            onClick={() => {
              onClickProduct(item.id);
            }}
          >
            <WrapIcon
              theme={{ icon: item?.iconHover }}
              style={{
                backgroundImage: `url(${item?.icon})`,
                backgroundSize: "contain",
              }}
            ></WrapIcon>
            <TextBottomIcon>{item.name}</TextBottomIcon>
          </WrapIconContainer>
        </WrapContainer>
      </SwiperSlide>
    ));
  }, [menuBarProjectType]);
  return (
	<>
			          <TextTitle>LOẠI BẤT ĐỘNG SẢN</TextTitle>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 100,
      }}
    >

      <div style={{ height: 85 }}>
        <IconPrevProduct
        //   style={{
        //     cursor: "pointer",
        //     position: "absolute",
        //     zIndex: 10,
        //     marginLeft: 10,
        //   }}
        />
      </div>
      <WrapSlide>
        <Swiper
          spaceBetween={10}
          speed={1000}
          //   centeredSlides={true}
          slidesPerView={5}
          navigation={{
            prevEl: ".icon-PrevProduct",
            nextEl: ".icon-NextProduct",
            // @ts-ignore
            clickable: true,
          }}
          observer={true}
          observeParents={true}
          //   autoplay={{
          // 	delay: 5000,
          // 	disableOnInteraction: false,
          //   }}
          //   modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{ maxWidth: 900, width: 900, height: 160 }}
        >

          {renderItems}
        </Swiper>
      </WrapSlide>
      <div style={{ height: 85 }}>
        <IconNextProduct
        // style={{
        //   cursor: "pointer",
        //   position: "absolute",
        //   zIndex: 10,
        //   right: 0,
        //   marginRight: 10,
        // }}
        />
      </div>
    </div>
	</>
  );
};
export default SliderCategoryIndex;
