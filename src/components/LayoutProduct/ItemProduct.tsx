import ItemProductCard from "@components/CustomComponent/ItemProductCard";
import Product2 from "../../../public/images/product2.png";
import styled from "@emotion/styled";
import PaddingComponent from "@components/CustomComponent/PagingComponent";
import Link from "next/link";
import { ProductsResponse } from "interface/product";

interface ProductsProps {
  data?: ProductsResponse[];
}

const ProductWrap = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(3, 1fr);
`;
const ItemProduct = ({ data }: ProductsProps) => {
  return (
    <>
      <ProductWrap>
        {data?.map((product, index) => (
          <ItemProductCard
            key={index}
            id={product.id}
            src={Product2}
            title={product.name}
            subTitle={product.homeNum}
            dataItem={{
              item1: product.landArea,
              item2: product.numBath,
              item3: product.numBed,
              item4: product.direction,
            }}
            priceListed={product.price}
            priceSub={40580174}
            ticketCard="TRN Star"
            activeSoSanh={true}
          />
        ))}
      </ProductWrap>
      <PaddingComponent />
    </>
  );
};
export default ItemProduct;
