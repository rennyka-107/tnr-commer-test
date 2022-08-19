import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router, { useRouter } from "next/router";
import { Button, Grid, Stack, Typography } from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import ContainerSearch from "@components/Container/ContainerSearch";
import { useDispatch, useSelector } from "react-redux";
import { getComparePopUpItem } from "../../../store/productCompareSlice";
import { IconEmptyFav } from "@components/Icons";
import { RootState } from "../../../store/store";

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

const ItemCardFavouriteProduct = ({ data }: ProductsProps) => {
  const { listMenuBarType, listMenuBarProjectType } = useSelector(
    (state: RootState) => state.menubar
  );
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
          priceTo: "20",
          priceFrom: "1",
          areaTo: "200",
          areaFrom: "30",
        },
      });
    };

  const onAdd = () => {
    router.push(
      `/search?Type=Advanded&textSearch=&provinceId=&projectTypeId=&projectId=&priceFrom=&priceTo=&areaFrom=0&areaTo=200`
    );
  };

  return (
    <>
      <ContainerSearch title={"Sản phẩm yêu thích"} checkBread={true}>
        <div>
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
                  onClick={() => addToCart(product.id)}
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
      </ContainerSearch>
    </>
  );
};
export default ItemCardFavouriteProduct;
