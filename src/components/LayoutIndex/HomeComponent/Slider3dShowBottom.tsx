import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import DefaultImage from "../../../../public/images/product_1.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { IconEye, IconMuaOnline } from "@components/Icons";
import IconSliderYellowLeft from "@components/Icons/IconSliderYellowLeft";
import IconSliderYellowRight from "@components/Icons/IconSliderYellowRight";
import useProjectRecenly from "hooks/useProjectRecenly";
import isEmpty from "lodash.isempty";
import ImageWithHideOnError from "hooks/ImageWithHideOnError";
import { useRouter } from "next/router";
import LocalStorage from "utils/LocalStorage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const TextLeftStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  height: 134px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  /* Brand/Text */

  color: #0e1d34;
`;
const ButtonStyled = styled(Button)`
  width: 164px;
  height: 48px;
  background: #ea242a;
  border-radius: 60px;
  :hover {
    background: #FEC83C;
    // box-shadow: 4px 8px 24px #f2f2f5;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    border-radius: 60px;
    color: #ffffff;
  }
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  text-transform: none;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 4px;
`;
const TextTitleStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;

  /* Brand/Main color */

  color: #1b3459;
`;
const WrapTopItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 11px;
  margin-right: 9px;
  margin-top: 14px;
`;
const TextInside = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  z-index: 1000;
  color: #ffffff;
  bottom: 0;
  height: 42px;
  padding: 16px;
  width: 180px;
  position: absolute;
`;
const TextInsideNumber = styled(Typography)`
  z-index: 1000;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: right;

  /* Brand/Text */

  color: #ffffff;
`;
SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);
const dataFake = [1, 2, 3, 4, 5, 6].map((el) => {
  return {
    avatar: "/images/product_1.png",
    viewNum: 127,
    name: "Dự án Thiện Long",
    id: el,
  };
});

export default function Slider3dShowBottom() {
  const { dataProductRecenly } = useProjectRecenly();
  const newArrayDataProductRecenly = dataProductRecenly.filter(
    (item) => item.id !== "1"
  );

  const [LSprojectId, setLSProjectID] = useState([]);
  useEffect(() => {
    newArrayDataProductRecenly.map((item) => {
      LSprojectId.push(item.id);
    });
  }, [newArrayDataProductRecenly]);
  const Router = useRouter();
  const generalInfo = useSelector((state: RootState) => state.generalInfo);

  const renderItems = useMemo(() => {
    return (
      isEmpty(newArrayDataProductRecenly)
        ? dataFake
        : newArrayDataProductRecenly
    )?.map((el: any) => (
      <SwiperSlide
        onClick={() =>
          Router.push(
            `/products?idProject=${el.id}&&provinceId=&&projectTypeId=`
          )
        }
        className="swiper-3d"
        style={{
          width: "241px !important",
          height: 342,
          cursor: "pointer",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.7)",
        }}
        key={el.id}
      >
        <WrapTopItem>
          <ImageWithHideOnError
            className="logo"
            src={el.avatar ? el.avatar : DefaultImage}
            fallbackSrc={DefaultImage}
            width={241}
            height={342}
            priority
            layout="fill"
            unoptimized={true}
          />
          <IconEye style={{ zIndex: 1000 }} />
          <TextInsideNumber>{el?.viewNum}</TextInsideNumber>
        </WrapTopItem>
        <TextInside>{el.name}</TextInside>
      </SwiperSlide>
    ));
  }, [newArrayDataProductRecenly]);

  const handleShowAll = () => {
    localStorage.setItem("listParamsIdProject", JSON.stringify(LSprojectId));
    Router.push(`/products?idProject=1&&provinceId=&&projectTypeId=`);
  };

  return (
    <>
      {!isEmpty(newArrayDataProductRecenly) ? (
        <div style={{ marginTop: 101, marginBottom: 130, marginLeft: 337 }}>
          <div>
            <TextTitleStyled>BẤT ĐỘNG SẢN XEM GẦN ĐÂY</TextTitleStyled>
          </div>
          <div
            style={{
              width: "100%",
              height: 481,
              display: "flex",
              //   justifyContent: "right",
              alignItems: "center",
            }}
          >
            <div style={{ width: 300 }}>
              <TextLeftStyled>
                {generalInfo?.policyContent ?? ""}
              </TextLeftStyled>
              <ButtonStyled onClick={handleShowAll}>
                Xem tất cả&nbsp;
                <IconMuaOnline />
              </ButtonStyled>
            </div>
            <div style={{ width: "100%", height: 470, position: "relative" }}>
              <IconSliderYellowLeft
                className="y-left"
                style={{
                  zIndex: 10,
                  position: "absolute",
                  top: "42%",
                  cursor: "pointer",
                  left: "-18px",
                }}
              />
              <Swiper
                autoplay={{
                  delay: 1000,
                }}
                navigation={{
                  nextEl: ".y-right",
                  prevEl: ".y-left",
                }}
                roundLengths={true}
                speed={5000}
                effect="coverflow"
                slidesPerView="auto"
                centeredSlides={true}
                style={{ height: "470px", width: "100%" }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 10,
                  depth: 10,
                  modifier: 1,
                  slideShadows: true,
                }}
                spaceBetween={45}
                slideToClickedSlide={true}
                // breakpoints={{
                //   // when window width is >= 640px
                //   640: {
                //     width: 240,
                //     slidesPerView: 'auto',
                //   },
                //   // when window width is >= 768px
                //   768: {
                //     width: 240,
                //     slidesPerView: 'auto',
                //   },
                // }}
              >
                {renderItems}
              </Swiper>
              <IconSliderYellowRight
                className="y-right"
                style={{
                  zIndex: 10,
                  position: "absolute",
                  right: "0px",
                  top: "42%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
