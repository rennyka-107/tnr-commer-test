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
import { Button, Typography, useMediaQuery } from "@mui/material";
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

const MarginContainerStyled = styled.div`
  margin-top: 101px;
  margin-bottom: 130px;
  margin-left: 380px;
  @media only screen and (max-width: 1280px) {
    margin: 20px;
  };
  @media only screen and (max-width: 1800px) {
    margin-left: 300px;
  };
  @media only screen and (max-width: 1600px) {
    margin-left: 170px;
  };
  @media only screen and (max-width: 1440px) {
    margin-left: 150px;
  }
`;

const ContainerStyled = styled.div`
  width: 100%;
  height: 481px;
  display: flex;
  align-items: center;
  gap: 100px;
  @media only screen and (max-width: 1500px) {
    gap: 75px;
  };
  @media only screen and (max-width: 1280px) {
    flex-direction: column-reverse;
    height: auto;
  }
`;

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
  background: #EA242A;
  border-radius: 60px;
  :hover {
    background: #fec83c;
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
  font-weight: 500;
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

const ContainerText = styled.div`
  width: 300px;
  @media only screen and (max-width: 1280px) {
    width: 700px;
    text-align: center;
  }
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

//   const defaultData = [
//     {
//       abbreviationName: "",
//       avatar:
//         "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
//       code: "DAPL03",
//       commune: "464",
//       constructArea: "4.500",
//       density: "120",
//       description: "Dự án tiềm năng",
//       diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
//       district: "23",
//       funcDivision: "Khu vip",
//       id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
//       location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
//       lsName: "Dự án test phụ lục 03",
//       lstProjectTypeId: null,
//       map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
//       modifyDate: "26-09-2022 11:18:14",
//       name: "Dự án test phụ lục 03",
//       ownership: "Sổ hồng, mua trả góp",
//       provincial: "2",
//       scale: "Siêu khổng lồ",
//       status: null,
//       tongBanGhi: null,
//       tradeName: "Dự án test phụ lục 03",
//       type: "",
//       viewNum: 4345,
//       visitContent: null,
//     },
// 	{
// 		abbreviationName: "",
// 		avatar:
// 		  "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
// 		code: "DAPL03",
// 		commune: "464",
// 		constructArea: "4.500",
// 		density: "120",
// 		description: "Dự án tiềm năng",
// 		diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		district: "23",
// 		funcDivision: "Khu vip",
// 		id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
// 		location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		lsName: "Dự án test phụ lục 03",
// 		lstProjectTypeId: null,
// 		map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
// 		modifyDate: "26-09-2022 11:18:14",
// 		name: "Dự án test phụ lục 03",
// 		ownership: "Sổ hồng, mua trả góp",
// 		provincial: "2",
// 		scale: "Siêu khổng lồ",
// 		status: null,
// 		tongBanGhi: null,
// 		tradeName: "Dự án test phụ lục 03",
// 		type: "",
// 		viewNum: 4345,
// 		visitContent: null,
// 	  },
// 	  {
// 		abbreviationName: "",
// 		avatar:
// 		  "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
// 		code: "DAPL03",
// 		commune: "464",
// 		constructArea: "4.500",
// 		density: "120",
// 		description: "Dự án tiềm năng",
// 		diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		district: "23",
// 		funcDivision: "Khu vip",
// 		id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
// 		location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		lsName: "Dự án test phụ lục 03",
// 		lstProjectTypeId: null,
// 		map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
// 		modifyDate: "26-09-2022 11:18:14",
// 		name: "Dự án test phụ lục 03",
// 		ownership: "Sổ hồng, mua trả góp",
// 		provincial: "2",
// 		scale: "Siêu khổng lồ",
// 		status: null,
// 		tongBanGhi: null,
// 		tradeName: "Dự án test phụ lục 03",
// 		type: "",
// 		viewNum: 4345,
// 		visitContent: null,
// 	  },
// 	  {
// 		abbreviationName: "",
// 		avatar:
// 		  "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
// 		code: "DAPL03",
// 		commune: "464",
// 		constructArea: "4.500",
// 		density: "120",
// 		description: "Dự án tiềm năng",
// 		diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		district: "23",
// 		funcDivision: "Khu vip",
// 		id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
// 		location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		lsName: "Dự án test phụ lục 03",
// 		lstProjectTypeId: null,
// 		map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
// 		modifyDate: "26-09-2022 11:18:14",
// 		name: "Dự án test phụ lục 03",
// 		ownership: "Sổ hồng, mua trả góp",
// 		provincial: "2",
// 		scale: "Siêu khổng lồ",
// 		status: null,
// 		tongBanGhi: null,
// 		tradeName: "Dự án test phụ lục 03",
// 		type: "",
// 		viewNum: 4345,
// 		visitContent: null,
// 	  },
// 	  {
// 		abbreviationName: "",
// 		avatar:
// 		  "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
// 		code: "DAPL03",
// 		commune: "464",
// 		constructArea: "4.500",
// 		density: "120",
// 		description: "Dự án tiềm năng",
// 		diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		district: "23",
// 		funcDivision: "Khu vip",
// 		id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
// 		location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		lsName: "Dự án test phụ lục 03",
// 		lstProjectTypeId: null,
// 		map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
// 		modifyDate: "26-09-2022 11:18:14",
// 		name: "Dự án test phụ lục 03",
// 		ownership: "Sổ hồng, mua trả góp",
// 		provincial: "2",
// 		scale: "Siêu khổng lồ",
// 		status: null,
// 		tongBanGhi: null,
// 		tradeName: "Dự án test phụ lục 03",
// 		type: "",
// 		viewNum: 4345,
// 		visitContent: null,
// 	  },
// 	  {
// 		abbreviationName: "",
// 		avatar:
// 		  "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/2567f8de-15d7-4d47-ac10-ce0061c78df0/67f0a8ad-47bf-4982-af0b-066666ac8961/88134e73-0953-47b8-b7c3-6f78d16343a2.jpg",
// 		code: "DAPL03",
// 		commune: "464",
// 		constructArea: "4.500",
// 		density: "120",
// 		description: "Dự án tiềm năng",
// 		diaChi: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		district: "23",
// 		funcDivision: "Khu vip",
// 		id: "2360ee8d-53f3-42c3-a01a-e1cd1d937844",
// 		location: "P.Mỗ Lao, Quận Hà Đông, TP. Hà Nội",
// 		lsName: "Dự án test phụ lục 03",
// 		lstProjectTypeId: null,
// 		map: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/2360ee8d-53f3-42c3-a01a-e1cd1d937844/dd4b4af4-3d20-4c7b-9cc1-89f9e1cf9a5b/67f0a8ad-47bf-4982-af0b-066666ac8961/b6be6071-f9bc-4e44-bb50-31bc491755c8.jpg",
// 		modifyDate: "26-09-2022 11:18:14",
// 		name: "Dự án test phụ lục 03",
// 		ownership: "Sổ hồng, mua trả góp",
// 		provincial: "2",
// 		scale: "Siêu khổng lồ",
// 		status: null,
// 		tongBanGhi: null,
// 		tradeName: "Dự án test phụ lục 03",
// 		type: "",
// 		viewNum: 4345,
// 		visitContent: null,
// 	  },
//   ];
  const newArrayDataProductRecenly = dataProductRecenly.filter(
    (item) => item.id !== "1"
  );
  const matches = useMediaQuery("(max-width:1440px)");

 

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
        onClick={() => Router.push(`/recently-view/${el.id}?title=${el.name}`)}
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
			style={""}
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
    Router.push(`/recently-view`);
  };

  return (
    <>
      {!isEmpty(newArrayDataProductRecenly) ? (
        <MarginContainerStyled>
          <div>
            <TextTitleStyled>BẤT ĐỘNG SẢN XEM GẦN ĐÂY</TextTitleStyled>
          </div>
          <ContainerStyled>
            <ContainerText>
              <TextLeftStyled>
                {generalInfo?.policyContent ?? ""}
              </TextLeftStyled>
              <ButtonStyled onClick={handleShowAll}>
                Xem tất cả&nbsp;&nbsp;&nbsp;
                <IconMuaOnline />
              </ButtonStyled>
            </ContainerText>
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
                  delay: 551000,
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
                className="mySwiper-BDSXGD"
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
                  right: matches && dataProductRecenly.length > 2 ? "60px" : matches ?  "45px" : "213px",
                  top: "42%",
                  cursor: "pointer",
                }}
              />
            </div>
          </ContainerStyled>
        </MarginContainerStyled>
      ) : (
        <></>
      )}
    </>
  );
}
