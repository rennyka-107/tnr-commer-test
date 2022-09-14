import _ from "lodash";
import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";
import Router, { useRouter } from "next/router";
import { Grid } from "@mui/material";
import useAddToCart from "hooks/useAddToCart";
import dynamic from "next/dynamic";

interface ProductsProps {
  data?: ProductsResponse[];
}

const DynamicProductCard = dynamic(() =>
  import("./ProjectCard").then(
    (m) => m.default,
    (e) => null as never
  )
);

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
  const {
    query: { projectId },
  } = useRouter();


  

  return (
    <>
      <ProductWrap>
        {data?.map((product: any, index) => {
          if (!projectId) {
            return (
              <ContainerProduct>
                <DynamicProductCard
                  id={product.id}
                  el={product}
                  src={product.avatar}
                  title={product?.name}
                  subTitle={product?.location}
                  ticketCard={product?.name}
                  description={product?.description}
                />
              </ContainerProduct>
            );
          } else {
            return (
              <ItemProductCard
                key={index}
                id={product.productionId}
                src={product.thumbnail}
                title={product.name}
                subTitle={product.projectName}
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
                onCompare={() => {
                  let prods = [];
                  if (typeof window !== "undefined") {
                    const local = localStorage.getItem("compare-item");
                    if (local !== null) {
                      prods = [...JSON.parse(local)];
                    } else {
                      localStorage.setItem(
                        "compare-item",
                        JSON.stringify(prods)
                      );
                    }
                  }
                  prods.unshift(product);
                  if (prods.length > 3) prods.pop();
                  localStorage.setItem("compare-item", JSON.stringify(prods));
                  Router.push("/compare-product");
                }}
                onClick={() => addToCart(product.id)}
                buyDisabled={product.paymentStatus !== 2}
              />
            );
          }
        })}
      </ProductWrap>
    </>
  );
};
export default ItemProduct;
