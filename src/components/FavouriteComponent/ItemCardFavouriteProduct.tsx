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
import { useDispatch } from "react-redux";
import { getComparePopUpItem } from "../../../store/productCompareSlice";
import { IconEmptyFav } from "@components/Icons";

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
      router.push({
        pathname: "/compare-search",
        query: {
          projectId: projectId,
          projectTypeId: projectType,
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
      <ContainerSearch title={"S???n ph???m y??u th??ch"} checkBread={true}>
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
              Ch??a c?? b???t ?????ng s???n n??o ???????c qu?? kh??ch ????a v??o y??u th??ch
            </StyledTitle>
            <StyledButton variant="contained" onClick={onAdd}>
              Th??m b???t ?????ng s???n y??u th??ch ngay
            </StyledButton>
          </Stack>
        )}
      </ContainerSearch>
    </>
  );
};
export default ItemCardFavouriteProduct;
