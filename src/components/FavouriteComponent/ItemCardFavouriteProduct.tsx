import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router, { useRouter } from "next/router";
import { Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import ContainerSearch from "@components/Container/ContainerSearch";
import { useDispatch, useSelector } from "react-redux";
import { getComparePopUpItem } from "../../../store/productCompareSlice";
import { IconEmptyFav, IconFilterSearch } from "@components/Icons";
import { RootState } from "../../../store/store";
import LocalStorage from "utils/LocalStorage";
import ContainerProductFavorite from "@components/Container/ContainerProductFavorite";
import PopperRadioComponent from "@components/CustomComponent/ListRadioSearchCompare/PopperRadioComponent";
import { useState } from "react";

interface ProductsProps {
  data?: ProductsResponse[];
}
const ContainerProduct = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  padding: 16px 32px;
  gap: 32px;
  background: #1b3459;
  border-radius: 8px;
  width: 339px;
  height: 53px;
  text-transform: none;
  :hover {
    background: #1b3459;
  }
`;

const StyledTitle = styled(Typography)`
  color: #1b3459;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;
const ContainerFilter = styled.div`
  display: flex;
  margin-bottom: 31px;
  gap: 90px;
  align-items: center;
  @media screen and (max-width: 1260px) {
    gap: 30px;
  }
  @media screen and (max-width: 1204px) {
    flex-direction: column;
    gap: 1px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 90px;
  @media screen and (max-width: 1680px) {
    gap: 70px;
  }
  @media screen and (max-width: 1630px) {
    gap: 60px;
  }
  @media screen and (max-width: 1600px) {
    gap: 50px;
  }
  @media screen and (max-width: 1560px) {
    gap: 32px;
  }
  @media screen and (max-width: 1300px) {
    gap: 25px;
  }
  @media screen and (max-width: 1260px) {
    gap: 20px;
  }
  @media screen and (max-width: 800px) {
    gap: 5px;
  }
`;

const ItemCardFavouriteProduct = ({ data }: ProductsProps) => {
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
  const { listMenuLocation } = useSelector((state: RootState) => state.menubar);
  const [listDataLSProvince, setListDataLSProvince] = useState([]);
  const matches = useMediaQuery("(max-width:1204px)");

  const addToCart = useAddToCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChangeLocation = (data: any) => {
    // const bodySearch: any = [];
    // if (!isEmpty(data)) {
    //   const arrayData: any = [];
    //   data.map((item) => {
    //     bodySearch.push(item.ProvinceID.toString());
    //     arrayData.push(item);
    //   });
    //   setListParamsProvince(bodySearch);
    //   fetchListProjectType(bodySearch);
    //   setListDataLSProvince(arrayData);
    //   setListIdProject([]);
    //   setListDataLSProjectType([]);
    //   setListDataLSProjectType([]);
    //   setParamsProjectType([]);
    //   fetchListProjectTypeByProvince(bodySearch);
    // }
    // fetchListProjectTypeByProvince(bodySearch);
    // setCheckSelectProvince(true);
  };

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

      dispatch(
        getComparePopUpItem([
          {
            thumbnail: thumbnail,
            projectName: projectName,
            name: name,
            productId: productId,
            projectId: projectId,
            projectType: projectType,
          },
        ])
      );
      // () => {
      //   dispatch(
      //     getComparePopUpItem([
      //       {
      //         thumbnail: thumbnail,
      //         projectName: projectName,
      //         name: name,
      //         productId: productId,
      //         projectId: projectId,
      //         projectType: projectType,
      //       },
      //     ])
      //   );
      router.push({
        pathname: "/compare-search",
        query: {
          //   projectId: projectId,
          //   projectTypeId: projectType,
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

  const onAdd = () => {
    router.push(
      `/search?Type=Advanded&textSearch=&provinceId=&projectTypeId=&projectId=&priceFrom=&priceTo=&areaFrom=0&areaTo=200`
    );
  };

  return (
    <div style={{ marginTop: 55, width: '100%' }}>
      <ContainerProductFavorite title={"Sản phẩm yêu thích"} checkBread={true}>
        <div 		  style={{marginTop: 150}}>
          {data.length > 0 ? (
            <ProductWrap>
              {data?.map((product, index) => (
                <ItemProductCard
                  key={index}
                  id={product.productId}
                  src={product.thumbnail}
                  title={product.name}
                  subTitle={product.projectLocation}
                  projectName={product.projectName}
                  dataItem={{
                    item1: product.landArea,
                    item2: product.numBath,
                    item3: product.numBed,
                    item4: product.doorDirection,
                  }}
                  projectTypeCode={product.projectTypeCode}
                  minFloor={product.minFloor}
                  maxFloor={product.maxFloor}
                  priceListed={product.totalPrice}
                  priceSub={product.unitPrice}
                  ticketCard={product.category}
                  activeSoSanh={true}
                  onCompare={onCompare(
                    product.projectId,
                    product.projectTypeId,
                    product.thumbnail,
                    product.projectName,
                    product.name,
                    product.productionId
                  )}
                  onClick={() => addToCart(product.productionId)}
                  buyDisabled={product.paymentStatus !== 2}
                />
              ))}
            </ProductWrap>
          ) : (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
	
            >
              <IconEmptyFav />
              <StyledTitle>
                Chưa có bất động sản nào được quý khách đưa vào yêu thích
              </StyledTitle>
              <StyledButton variant="contained" onClick={onAdd}>
                Thêm bất động sản yêu thích ngay
              </StyledButton>
            </Stack>
          )}
        </div>
      </ContainerProductFavorite>
    </div>
  );
};
export default ItemCardFavouriteProduct;
