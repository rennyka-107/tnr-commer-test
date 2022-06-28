import _ from "lodash";

import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ProductCardSearch from "@components/CustomComponent/ItemProductCard/ProductCardSearch";
import useAddToCart from "hooks/useAddToCart";

interface searchProps {
  data?: searchLocationResponse[];
  buyDisabled?:boolean;
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
const ItemSearch = ({ data ,buyDisabled}: searchProps) => {
  const addToCart = useAddToCart();

  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ProductCardSearch
            onClick={() => addToCart(product.productId)}
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
            buyDisabled={product?.paymentStatus!==2}
          />
        ))}
      </ProductWrap>
    </>
  );
};
export default ItemSearch;
