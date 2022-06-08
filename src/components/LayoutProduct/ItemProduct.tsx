import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router from "next/router";
import { Grid } from "@mui/material";

interface ProductsProps {
  data?: ProductsResponse[];
}
const ContainerProduct = styled.div`
    display: flex;
    justify-content:center;
`;
const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(4, 1fr);
`;
const ItemProduct = ({ data }: ProductsProps) => {
  // console.log(data)
  return (
    <>
      {!_.isEmpty(data) ? (
        // <ProductWrap>
        <Grid container spacing={4}>
          {data?.map((product, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <ContainerProduct>
                <ItemProductCard
                  key={index}
                  id={product.id}
                  src={Product2}
                  title={product.name}
                  subTitle={product.location}
                  dataItem={{
                    item1: product.landArea,
                    item2: product.numBath,
                    item3: product.numBed,
                    item4: product.doorDirection,
                  }}
                  priceListed={product.price}
                  priceSub={product.unitPrice}
                  ticketCard="TRN Star"
                  activeSoSanh={true}
                  onClick={() => {
                    Router.push("/payment-cart/" + product.id);
                  }}
                />
              </ContainerProduct>
            </Grid>
          ))}
        </Grid>
      ) : (
        // </ProductWrap>
        <div>No Data</div>
      )}
    </>
  );
};
export default ItemProduct;
