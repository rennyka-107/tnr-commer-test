import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router from "next/router";
import { Grid } from "@mui/material";
import useAddToCart from "hooks/useAddToCart";

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
const ItemProduct = ({ data }: ProductsProps) => {
  const addToCart = useAddToCart();
  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ItemProductCard
            key={index}
            id={product.productId}
            src={product.thumbnail}
            title={product.name}
            subTitle={product.location}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.doorDirection,
            }}
            priceListed={product.totalPrice}
            priceSub={product.unitPrice}
            ticketCard={product.category}
            activeSoSanh={true}
            onCompare={() => {
              let prods = [];
              if (typeof window !== "undefined") {
                const local = localStorage.getItem("compare-item");
                if (local !== null) {
                  prods = [...JSON.parse(local)];
                } else {
                  localStorage.setItem("compare-item", JSON.stringify(prods));
                }
              }
              prods.unshift(product);
              if (prods.length > 3) prods.pop();
              localStorage.setItem("compare-item", JSON.stringify(prods));
              Router.push("/compare-product");
            }}
            onClick={() => addToCart(product.id)}
            buyDisabled={product.paymentStatus!==2}
          />
        ))}
      </ProductWrap>
    </>
  );
};
export default ItemProduct;
