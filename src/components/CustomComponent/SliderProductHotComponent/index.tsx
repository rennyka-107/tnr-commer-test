import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import styled from "@emotion/styled";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import {
  IconCarsouelLeftProduct,
  IconCarsouelRightProduct,
} from "@components/Icons";
import ItemProductCard from "../ItemProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import useAddToCart from "hooks/useAddToCart";
import { useRouter } from "next/router";
import { getComparePopUpItem } from "../../../../store/productCompareSlice";

const WrapSlide = styled.div`
  width: 1245px;
  display: flex;
  align-items: center;
`;
const CardContainer = styled.div`
  background-size: cover;
  border-radius: 10px;
`;
SwiperCore.use([Autoplay, Pagination, Navigation]);
export default function SliderProductHotComponent() {
  const { productTopByOutStanding } = useSelector(
    (state: RootState) => state.products
  );
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const [dataProjectType, setDataProjectType] = useState([]);
  const [dataProject, setDataProject] = useState([]);

  const addToCart = useAddToCart();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onCompare =
    (
      projectId: string,
      projectType: string,
      thumbnail: string,
      projectName: string,
      name: string,
      productId: string
    ) =>
    () => {
      const dataProjectType = listMenuBarProjectType.filter(
        (item) => item.id === projectType
      );
      const dataProject = listMenuBarType.filter(
        (item) => item.id === projectId
      );
      localStorage.setItem(
        "listDataLSProjectType",
        JSON.stringify([dataProjectType[0]])
      );
      localStorage.setItem(
        "listParamsLSProjectType",
        JSON.stringify([dataProjectType[0].id])
      );
      localStorage.setItem(
        "listDataLSProject",
        JSON.stringify([dataProject[0]])
      );
      localStorage.setItem(
        "listParamsIdProject",
        JSON.stringify([dataProject[0].id])
      );
    //   console.log(dataProjectType, dataProject);
      dispatch(
        getComparePopUpItem([
          {
            thumbnail: thumbnail,
            projectName: name,
            name: projectName,
            productId: productId,
            projectId: projectId,
            projectType: projectType,
          },
        ])
      );
        router.push({
          pathname: "/compare-search",
          query: {
            // projectId: projectId,
            // projectTypeId: projectType,
            priceTo: "20",
            priceFrom: "1",
            areaTo: "200",
            areaFrom: "30",
          },
        });
    };

  return (
    <WrapSlide>
      <IconCarsouelLeftProduct style={{ cursor: "pointer" }} />
      <Swiper
        spaceBetween={10}
        speed={6000}
        centeredSlides={false}
        slidesPerView={3}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".icon-LeftArow-prod",
          nextEl: ".icon-rightArow-prod",
          // @ts-ignore
          clickable: true,
        }}
        observer={true}
        observeParents={true}
        // modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ width: 1113 }}
      >
        {productTopByOutStanding.map((item, index) => (
          <SwiperSlide key={index}>
            <CardContainer>
              <ItemProductCard
                key={index}
                id={item.id}
                projectName={item.projectName}
                src={item.avatar}
                title={item.name}
                subTitle={item.projectLocation}
                activeFavourite={true}
                dataItem={{
                  item1: item.landArea,
                  item2: item.numBath,
                  item3: item.numBed,
                  item4: item.doorDirection,
                }}
                priceListed={item.price}
                priceSub={item.unitPrice}
                ticketCard={item.category}
                projectTypeCode={item.projectTypeCode}
                favouriteStatus={item.favouriteStatus}
                minFloor={item.minFloor}
                maxFloor={item.maxFloor}
                onClick={() => addToCart(item.id)}
                activeSoSanh={true}
                buyDisabled={item?.paymentStatus !== 2}
                onCompare={onCompare(
                  item.projectId,
                  item.projectTypeId,
                  item.avatar,
                  item.name,
                  item.projectName,
                  item.id
                )}
              />
            </CardContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconCarsouelRightProduct style={{ cursor: "pointer" }} />
    </WrapSlide>
  );
}
