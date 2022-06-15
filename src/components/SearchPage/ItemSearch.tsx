import _ from "lodash";

import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ProductCardSearch from "@components/CustomComponent/ItemProductCard/ProductCardSearch";

interface searchProps {
  data?: searchLocationResponse[];
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
const ItemSearch = ({ data }: searchProps) => {

  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ProductCardSearch
            key={index}
            id={product.productId}
            src={Product2}
            title={product.nameProduct}
            subTitle={product.location}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.doorDirection,
            }}
			priceListed={product.totalPrice}
            priceSub={product.unitPrice}
          />
        ))}
      </ProductWrap>
    </>
  );
};
export default ItemSearch;
