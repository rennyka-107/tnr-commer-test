import _ from "lodash";

import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import { searchLocationResponse } from "interface/searchIF";
import ProductCardSearch from "@components/CustomComponent/ItemProductCard/ProductCardSearch";
import ItemCompareSearch from "@components/CustomComponent/ItemProductCard/ItemCompareSearch";
import LocalStorage from "utils/LocalStorage";

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

  const onCompare = (product: searchLocationResponse) => () => {
    const list = LocalStorage.get("compare-item");
    if (list) {
      // const item = JSON.parse(list);
      if (list.length >= 3 || list.find((prod: searchLocationResponse) => prod.productId === product.productId)) return;
      list.push(product);
      LocalStorage.set('compare-item', list);
    }else{
      LocalStorage.set('compare-item', [product]);
    }
    console.log(list);
  };

  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ItemCompareSearch
            key={index}
            id={product.productId}
            src={product.thumbnail}
            title={product.name}
            projectName={product.projectName}
            subTitle={product.location}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.doorDirection,
            }}
			priceListed={product.totalPrice}
			projectTypeCode={product.projectTypeCode}
			minFloor={product.minFloor}
			maxFloor={product.maxFloor}
            priceSub={product.unitPrice}
            ticketCard={product.category}
            onCompare={onCompare(product)}
          />
        ))}
      </ProductWrap>
    </>
  );
};
export default ItemSearch;
