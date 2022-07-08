import React from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import useAddToCart from "hooks/useAddToCart";


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
  const addToCart = useAddToCart();

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
				minFloor={item.minFloor}
				maxFloor={item.maxFloor}
                onClick={() => addToCart(item.id)}
				activeSoSanh={true}
                buyDisabled={item?.paymentStatus!==2}
              />
            </CardContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconCarsouelRightProduct style={{ cursor: "pointer" }} />
    </WrapSlide>
  );
}
