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
import ConfirmDialog from "@components/SearchPage/ConfirmDialog";
import { searchLocationResponse } from "interface/searchIF";
import { isEmpty } from "lodash";
import useNotification from "hooks/useNotification";
import { useMediaQuery } from "@mui/material";
import LocalStorage from "utils/LocalStorage";
import useHover from "hooks/useHover";

const WrapSlide = styled.div`
  display: flex;
  align-items: center;
`;
const CardContainer = styled.div`
  background-size: cover;
  border-radius: 10px;
`;

const LeftIconStyled = styled(IconCarsouelLeftProduct)`
  cursor: pointer;
`;
SwiperCore.use([Autoplay, Pagination, Navigation]);
export default function SliderProductHotComponent({ hoverCheck }) {
  const { productTopByOutStanding } = useSelector(
    (state: RootState) => state.products
  );
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );

  const matches = useMediaQuery("(max-width:1110px)");

  const [dataProjectType, setDataProjectType] = useState([]);
  const [dataProject, setDataProject] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [tempCart, setTempCart] = useState<searchLocationResponse | null>(null);
  const { cart } = useSelector((state: RootState) => state.carts);
  const notification = useNotification();

  const swiperRef = React.useRef<SwiperCore>();
  const onInit = (Swiper: SwiperCore): void => {
    swiperRef.current = Swiper;
  };
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  useEffect(() => {
    if (hoverCheck === true) {
      if (swiperRef.current) {
        swiperRef.current.autoplay.stop();
      }
    } else {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }
    console.log(hoverCheck);
  }, [hoverCheck]);

  const addToCart = useAddToCart();
  const router = useRouter();
  const dispatch = useDispatch();

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
          priceTo: "50",
          priceFrom: "0",
          areaTo: "1000",
          areaFrom: "0",
        },
      });
      LocalStorage.set("compare-url", {
        projectId: projectId,
        projectTypeId: projectType,
        priceTo: "50",
        priceFrom: "0",
        areaTo: "1000",
        areaFrom: "0",
        categoryId: "",
      });
    };

  const handleAddToCart = (product: any) => () => {
    if (cart && cart.id === product.id) {
      // notification({
      //   severity: "success",
      //   message: "Sản phẩm này đã có sẵn trong giỏ hàng",
      // });
      router.push("/payment-cart");
    } else if (isEmpty(cart)) {
      addToCart(product.id);
    } else {
      setTempCart(product);
      setOpenConfirmDialog(true);
    }
  };

  const handleChangeCartITem = (product: any) => () => {
    addToCart(product.id);
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  return (
    <WrapSlide>
      <LeftIconStyled style={{ cursor: "pointer", marginRight: 20 }} />
      {/* <div onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}> */}
      <Swiper
        onInit={onInit}
        // ref={hoverRef}
        spaceBetween={10}
        speed={4000}
        centeredSlides={false}
        slidesPerView={matches ? 2 : 3}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
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
        className="mySwiper-BDSNB"
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
                build={item.build}
                minFloor={item.minFloor}
                maxFloor={item.maxFloor}
                floor={item.floor}
                floorHeight={item.floorHeight}
                onClick={handleAddToCart(item)}
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
      {/* </div> */}
      <IconCarsouelRightProduct style={{ cursor: "pointer" }} />
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleChangeCartITem}
        tempCart={tempCart}
      />
    </WrapSlide>
  );
}
